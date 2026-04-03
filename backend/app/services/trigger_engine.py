from datetime import datetime, timezone, timedelta
import logging
from sqlalchemy.orm import Session
from fastapi import BackgroundTasks
from ..db import models
from ..schemas.trigger import TriggerCreate, TriggerResponse
from ..services import payout_engine
from ..db.database import SessionLocal

logger = logging.getLogger(__name__)

THRESHOLDS = {
    "WEATHER": {
        "rainfall_mm":    {"min": 35.0,  "label": "Rainfall",  "unit": "mm/hr"},
        "temperature_c":  {"min": 40.0,  "label": "Heat",      "unit": "°C"},
        "wind_kmh":       {"min": 40.0,  "label": "Wind",      "unit": "km/hr"},
    },
    "AQI": {
        "aqi_value":           {"min": 300, "label": "AQI",             "unit": "AQI"},
    },
    "PLATFORM_BLACKOUT": {
        "outage_duration_min": {"min": 45,  "label": "Outage duration", "unit": "min"},
    },
    "SOCIAL_DISRUPTION": {
        "news_confidence_pct": {"min": 75,  "label": "News confidence", "unit": "%"},
    },
}

PEAK_WINDOWS = [("12:00", "14:30"), ("19:00", "22:30")]


def _hhmm_to_minutes(t: str) -> int:
    h, m = t.split(":")
    return int(h) * 60 + int(m)


def _overlap_hours(d_start: str, d_end: str, s_start: str, s_end: str) -> float:
    """
    Returns the overlapping hours between disruption window and rider shift.
    Both are HH:MM strings. Handles same-day windows only (no midnight wrap for simplicity).
    """
    ds = _hhmm_to_minutes(d_start)
    de = _hhmm_to_minutes(d_end)
    ss = _hhmm_to_minutes(s_start)
    se = _hhmm_to_minutes(s_end)

    if de <= ds:   # disruption crosses midnight — clamp to end of day
        de = 23 * 60 + 59
    if se <= ss:   # shift crosses midnight — clamp to end of day
        se = 23 * 60 + 59

    overlap_min = max(0, min(de, se) - max(ds, ss))
    return round(overlap_min / 60.0, 4)


def _validate_thresholds(data: TriggerCreate):
    rules = THRESHOLDS.get(data.metric_type, {})
    if not rules:
        return False, f"Unknown metric_type: {data.metric_type}"

    checks, passed_any = [], False

    if data.metric_type == "WEATHER":
        for field, rule in rules.items():
            val = getattr(data, field, None)
            if val is not None:
                ok = val >= rule["min"]
                checks.append(f"{rule['label']} {val}{rule['unit']} {'✓' if ok else '✗'} (≥{rule['min']})")
                if ok:
                    passed_any = True
        if not checks:
            return False, "WEATHER needs at least one of: rainfall_mm, temperature_c, wind_kmh"

    elif data.metric_type == "AQI":
        if data.aqi_value is None:
            return False, "AQI requires aqi_value"
        ok = data.aqi_value >= rules["aqi_value"]["min"]
        checks.append(f"AQI {data.aqi_value} {'✓' if ok else '✗'} (≥{rules['aqi_value']['min']})")
        if ok:
            passed_any = True

    elif data.metric_type == "PLATFORM_BLACKOUT":
        if data.outage_duration_min is None:
            return False, "PLATFORM_BLACKOUT requires outage_duration_min"
        ok = data.outage_duration_min >= rules["outage_duration_min"]["min"]
        checks.append(f"Outage {data.outage_duration_min}min {'✓' if ok else '✗'} (≥{rules['outage_duration_min']['min']})")
        if ok:
            passed_any = True
        # Peak hour check on start time
        in_peak = any(s <= data.trigger_time <= e for s, e in PEAK_WINDOWS)
        if not in_peak:
            return False, f"PLATFORM_BLACKOUT only triggers during peak hours (12:00–14:30 or 19:00–22:30). Got {data.trigger_time}."

    elif data.metric_type == "SOCIAL_DISRUPTION":
        if data.news_confidence_pct is None:
            return False, "SOCIAL_DISRUPTION requires news_confidence_pct"
        ok = data.news_confidence_pct >= rules["news_confidence_pct"]["min"]
        checks.append(f"News confidence {data.news_confidence_pct}% {'✓' if ok else '✗'} (≥{rules['news_confidence_pct']['min']}%)")
        if ok:
            passed_any = True

    summary = " | ".join(checks)
    return (True, summary) if passed_any else (False, f"Threshold not met — {summary}")


def _promote_pending_policies(db: Session, now: datetime):
    pending = db.query(models.Policy).filter(models.Policy.status == "PENDING").all()
    promoted = 0
    for p in pending:
        if p.activated_at:
            act = p.activated_at
            if act.tzinfo is None:
                act = act.replace(tzinfo=timezone.utc)
            if act <= now:
                p.status = "ACTIVE"
                promoted += 1
    if promoted:
        db.commit()


def activate_trigger(data: TriggerCreate, db: Session, background_tasks: BackgroundTasks) -> TriggerResponse:
    from ..core.config import DEMO_PAYOUT_INTERVAL_SECONDS

    zone = db.query(models.GeoZone).filter(models.GeoZone.zone_id == data.zone_id).first()
    if not zone:
        raise ValueError(f"Zone {data.zone_id} does not exist.")

    if data.trigger_end_time <= data.trigger_time:
        raise ValueError(f"trigger_end_time ({data.trigger_end_time}) must be after trigger_time ({data.trigger_time}).")

    passed, threshold_msg = _validate_thresholds(data)
    if not passed:
        raise ValueError(f"Trigger rejected: {threshold_msg}")

    now = datetime.now(timezone.utc)
    _promote_pending_policies(db, now)

    metadata = dict(data.event_metadata or {})
    metadata.update({
        "trigger_time": data.trigger_time,
        "trigger_end_time": data.trigger_end_time,
        "threshold_check": threshold_msg,
    })
    for field in ("rainfall_mm", "temperature_c", "wind_kmh", "aqi_value",
                  "outage_duration_min", "news_confidence_pct"):
        val = getattr(data, field, None)
        if val is not None:
            metadata[field] = val

    event = models.TriggerEvent(
        zone_id=data.zone_id,
        metric_type=data.metric_type,
        event_metadata=metadata,
        intensity_level=data.intensity_level,
        started_at=now,
        is_active=True,
    )
    db.add(event)
    db.commit()
    db.refresh(event)

    # Evaluate eligible riders and compute per-rider overlap
    zone_links = db.query(models.RiderZone).filter(models.RiderZone.zone_id == data.zone_id).all()
    zone_profile_ids = {link.profile_id for link in zone_links}

    active_policies = db.query(models.Policy).filter(
        models.Policy.profile_id.in_(zone_profile_ids),
        models.Policy.status == "ACTIVE",
        models.Policy.expires_at > now,
    ).all()

    eligible, skipped_shift = 0, 0
    max_overlap = 0.0

    for policy in active_policies:
        rider = db.query(models.RiderProfile).filter(
            models.RiderProfile.profile_id == policy.profile_id
        ).first()
        if not rider:
            continue
        shift_start = rider.shift_hours.get("start", "00:00")
        shift_end   = rider.shift_hours.get("end", "23:59")
        overlap = _overlap_hours(data.trigger_time, data.trigger_end_time, shift_start, shift_end)
        if overlap > 0:
            eligible += 1
            max_overlap = max(max_overlap, overlap)
        else:
            skipped_shift += 1
            logger.info(f"[TRIGGER] Rider {policy.profile_id} — no overlap. Disruption {data.trigger_time}–{data.trigger_end_time}, Shift {shift_start}–{shift_end}")

    # Interval count: 1 interval per 10 demo-seconds, representing 30 real minutes each
    # Real: disruption_hours × 2 intervals/hr. Demo: same count, each fires every 10s.
    real_intervals = max(1, round(max_overlap * 2))  # 2 per hour = every 30 min
    # Demo: we fire real_intervals intervals, each 10s apart
    interval_count = real_intervals

    # Estimate payouts for display (using city baseline for the zone's city)
    city = db.query(models.CityBenchmark).filter(
        models.CityBenchmark.city_id == zone.city_id
    ).first()
    est_new = est_ret = 0.0
    if city and float(city.baseline_active_hours) > 0:
        hourly = float(city.baseline_weekly_income) / float(city.baseline_active_hours)
        # new user: 40% coverage, intensity multiplier
        intensity_mult = {"LOW": 0.5, "MEDIUM": 0.75, "HIGH": 1.0, "CRITICAL": 1.25}.get(data.intensity_level, 1.0)
        est_new = round(max_overlap * hourly * 0.40 * intensity_mult, 2)
        # returning user at max R (65% coverage)
        est_ret = round(max_overlap * hourly * 0.65 * intensity_mult, 2)

    logger.info(f"[TRIGGER] Event {event.event_id} | zone {data.zone_id} | overlap={max_overlap}h | {interval_count} intervals | {eligible} eligible | {skipped_shift} skipped")

    bg_db = SessionLocal()
    background_tasks.add_task(
        payout_engine.process_payouts_for_event,
        bg_db,
        event.event_id,
        zone.zone_id,
        data.trigger_time,
        data.trigger_end_time,
        interval_count,
    )

    return TriggerResponse(
        event_id=str(event.event_id),
        zone_id=data.zone_id,
        metric_type=data.metric_type,
        status="ACTIVATED",
        riders_evaluated=len(active_policies),
        payouts_queued=eligible,
        message=f"Disruption {data.trigger_time}–{data.trigger_end_time} | {eligible} rider(s) eligible | {interval_count} payout intervals of 10s each.",
        threshold_check=threshold_msg,
        skipped_fraud=skipped_shift,
        overlap_hours=max_overlap,
        interval_count=interval_count,
        estimated_payout_new=est_new,
        estimated_payout_returning=est_ret,
    )
