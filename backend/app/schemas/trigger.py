from pydantic import BaseModel, field_validator
from typing import Optional, Dict


class TriggerCreate(BaseModel):
    zone_id: int
    metric_type: str            # WEATHER | AQI | PLATFORM_BLACKOUT | SOCIAL_DISRUPTION
    intensity_level: str        # LOW | MEDIUM | HIGH | CRITICAL
    trigger_time: str           # HH:MM — disruption start (IST)
    trigger_end_time: str       # HH:MM — disruption end (IST)
    # Type-specific metric values
    rainfall_mm: Optional[float] = None
    temperature_c: Optional[float] = None
    wind_kmh: Optional[float] = None
    aqi_value: Optional[int] = None
    outage_duration_min: Optional[int] = None
    news_confidence_pct: Optional[int] = None
    event_metadata: Optional[Dict] = {}

    @field_validator("trigger_time", "trigger_end_time")
    @classmethod
    def validate_time_format(cls, v):
        parts = v.split(":")
        if len(parts) != 2 or not all(p.isdigit() for p in parts):
            raise ValueError("time must be HH:MM")
        h, m = int(parts[0]), int(parts[1])
        if not (0 <= h <= 23 and 0 <= m <= 59):
            raise ValueError("time out of range")
        return v


class TriggerResponse(BaseModel):
    event_id: str
    zone_id: int
    metric_type: str
    status: str
    riders_evaluated: int
    payouts_queued: int
    message: str
    threshold_check: str
    skipped_fraud: int
    overlap_hours: float        # actual disruption∩shift overlap in hours
    interval_count: int         # number of 10-second payout intervals
    estimated_payout_new: float # estimated total payout for a new user (40% coverage)
    estimated_payout_returning: float  # estimated for returning user at max R
