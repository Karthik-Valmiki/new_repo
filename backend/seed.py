"""
seed.py — run once to seed cities/zones, then optionally seed returning demo riders.

Usage:
  python seed.py              → seeds cities + zones only (safe to re-run)
  python seed.py --returning  → also adds 3 returning demo riders with history
"""
import sys
import math
import uuid
from datetime import date, timedelta, datetime, timezone
import bcrypt

from app.db.database import SessionLocal, engine
from app.db import models


# ── helpers ──────────────────────────────────────────────────────────────────

def _hash(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()


def _r(tu, de, cr) -> float:
    return round(min(math.sqrt(tu * de * cr), 1.0), 2)


def _week(offset_weeks: int) -> date:
    """Monday of (current week - offset_weeks)."""
    today = date.today()
    monday = today - timedelta(days=today.weekday())
    return monday - timedelta(weeks=offset_weeks)


# ── returning rider profiles ──────────────────────────────────────────────────
# Three archetypes: high-R (top performer), mid-R (average), low-R (struggling)

RETURNING_RIDERS = [
    {
        "name": "Arjun Mehta",
        "phone": "+919000000001",
        "password": "demo1234",
        "platform": "Zomato",
        "city": "Mumbai",
        "zone": "Bandra",
        "upi": "arjun.mehta@upi",
        "shift": {"start": "08:00", "end": "22:00"},
        "history": [
            {"offset": 1, "tu": 0.95, "de": 0.93, "cr": 0.96},
            {"offset": 2, "tu": 0.92, "de": 0.90, "cr": 0.94},
            {"offset": 3, "tu": 0.90, "de": 0.88, "cr": 0.93},
            {"offset": 4, "tu": 0.88, "de": 0.87, "cr": 0.91},
        ],
    },
    {
        "name": "Priya Nair",
        "phone": "+919000000002",
        "password": "demo1234",
        "platform": "Swiggy",
        "city": "Bengaluru",
        "zone": "Indiranagar",
        "upi": "priya.nair@upi",
        "shift": {"start": "10:00", "end": "20:00"},
        "history": [
            {"offset": 1, "tu": 0.60, "de": 0.55, "cr": 0.58},
            {"offset": 2, "tu": 0.58, "de": 0.52, "cr": 0.60},
            {"offset": 3, "tu": 0.55, "de": 0.50, "cr": 0.57},
            {"offset": 4, "tu": 0.52, "de": 0.48, "cr": 0.55},
        ],
    },
    {
        "name": "Ravi Kumar",
        "phone": "+919000000003",
        "password": "demo1234",
        "platform": "Zomato",
        "city": "Delhi",
        "zone": None,
        "upi": "ravi.kumar@upi",
        "shift": {"start": "07:00", "end": "23:00"},
        "history": [
            {"offset": 1, "tu": 0.35, "de": 0.30, "cr": 0.72},
            {"offset": 2, "tu": 0.32, "de": 0.28, "cr": 0.70},
            {"offset": 3, "tu": 0.30, "de": 0.25, "cr": 0.68},
            {"offset": 4, "tu": 0.28, "de": 0.22, "cr": 0.65},
        ],
    },
    # ── 2 new returning riders added for extended testing ─────────────────────
    {
        "name": "Deepa Krishnan",
        "phone": "+919000000004",
        "password": "demo1234",
        "platform": "Swiggy",
        "city": "Chennai",
        "zone": "T Nagar",
        "upi": "deepa.krishnan@upi",
        "shift": {"start": "11:00", "end": "23:00"},
        # Strong mid-performer, improving trend → R ≈ 0.72
        "history": [
            {"offset": 1, "tu": 0.78, "de": 0.74, "cr": 0.80},
            {"offset": 2, "tu": 0.74, "de": 0.70, "cr": 0.78},
            {"offset": 3, "tu": 0.70, "de": 0.65, "cr": 0.75},
            {"offset": 4, "tu": 0.65, "de": 0.60, "cr": 0.72},
        ],
    },
    {
        "name": "Suresh Babu",
        "phone": "+919000000005",
        "password": "demo1234",
        "platform": "Zomato",
        "city": "Hyderabad",
        "zone": None,
        "upi": "suresh.babu@upi",
        "shift": {"start": "09:00", "end": "21:00"},
        # Recovering rider, was low now climbing → R ≈ 0.45
        "history": [
            {"offset": 1, "tu": 0.50, "de": 0.45, "cr": 0.62},
            {"offset": 2, "tu": 0.44, "de": 0.40, "cr": 0.58},
            {"offset": 3, "tu": 0.38, "de": 0.35, "cr": 0.55},
            {"offset": 4, "tu": 0.30, "de": 0.28, "cr": 0.50},
        ],
    },
]


# ── seed functions ────────────────────────────────────────────────────────────

def seed_base(db):
    if db.query(models.CityBenchmark).first():
        print("Cities already seeded — skipping base seed.")
        return

    print("Seeding cities...")
    city_data = [
        ("Bengaluru", 5600.00, 50.00, 1.15),
        ("Chennai",   5200.00, 48.00, 1.20),
        ("Mumbai",    5800.00, 52.00, 1.25),
        ("Delhi",     5700.00, 50.00, 1.20),
        ("Gurgaon",   5500.00, 48.00, 1.10),
        ("Hyderabad", 5400.00, 48.00, 1.05),
        ("Vizag",     4200.00, 45.00, 1.05),
        ("Pune",      5100.00, 48.00, 1.10),
        ("Kolkata",   4600.00, 48.00, 1.15),
        ("Ahmedabad", 4800.00, 46.00, 1.05),
    ]
    db.add_all([
        models.CityBenchmark(city_name=n, baseline_weekly_income=i,
                             baseline_active_hours=h, default_risk_multiplier=m)
        for n, i, h, m in city_data
    ])
    db.commit()

    bengaluru = db.query(models.CityBenchmark).filter_by(city_name="Bengaluru").first()
    chennai   = db.query(models.CityBenchmark).filter_by(city_name="Chennai").first()
    mumbai    = db.query(models.CityBenchmark).filter_by(city_name="Mumbai").first()

    print("Seeding zones...")
    db.add_all([
        models.GeoZone(city_id=bengaluru.city_id, zone_name="Indiranagar", base_risk_multiplier=1.15),
        models.GeoZone(city_id=chennai.city_id,   zone_name="T Nagar",     base_risk_multiplier=1.20),
        models.GeoZone(city_id=mumbai.city_id,    zone_name="Bandra",       base_risk_multiplier=1.25),
    ])
    db.commit()
    print("Base seed complete.")


def seed_returning_riders(db):
    print("\nSeeding returning demo riders...")

    for rd in RETURNING_RIDERS:
        # Skip if already exists
        if db.query(models.RiderProfile).filter_by(phone_number=rd["phone"]).first():
            print(f"  {rd['name']} already exists — skipping.")
            continue

        city = db.query(models.CityBenchmark).filter_by(city_name=rd["city"]).first()
        if not city:
            print(f"  City {rd['city']} not found — skipping {rd['name']}.")
            continue

        # Get or create zone
        if rd["zone"]:
            zone = db.query(models.GeoZone).filter_by(
                city_id=city.city_id, zone_name=rd["zone"]
            ).first()
        else:
            zone = db.query(models.GeoZone).filter_by(city_id=city.city_id).first()

        if not zone:
            zone = models.GeoZone(
                city_id=city.city_id,
                zone_name=f"{city.city_name} Central",
                base_risk_multiplier=city.default_risk_multiplier,
            )
            db.add(zone)
            db.flush()

        # Compute R from latest week
        latest = rd["history"][0]
        r_val = _r(latest["tu"], latest["de"], latest["cr"])

        rider = models.RiderProfile(
            full_name=rd["name"],
            phone_number=rd["phone"],
            hashed_password=_hash(rd["password"]),
            platform=rd["platform"],
            city_id=city.city_id,
            shift_hours=rd["shift"],
            upi_id=rd["upi"],
            reliability_score=r_val,
            is_verified=True,
        )
        db.add(rider)
        db.flush()

        # Mark OTP as used so login works without OTP flow
        existing_otp = db.query(models.OtpStore).filter_by(phone_number=rd["phone"]).first()
        if not existing_otp:
            db.add(models.OtpStore(
                phone_number=rd["phone"],
                otp_code="000000",
                expires_at=datetime.now(timezone.utc),
                is_used=True,
            ))

        db.add(models.RiderZone(
            profile_id=rider.profile_id,
            zone_id=zone.zone_id,
            is_primary=True,
        ))

        # Insert 4 weeks of performance history
        for week_data in rd["history"]:
            tu, de, cr = week_data["tu"], week_data["de"], week_data["cr"]
            db.add(models.RiderPerformanceHistory(
                profile_id=rider.profile_id,
                week_start_date=_week(week_data["offset"]),
                time_utilization=tu,
                delivery_efficiency=de,
                completion_rate=cr,
                final_r_score=_r(tu, de, cr),
            ))

        db.commit()

        # Compute and display what their premium looks like
        risk_multi = float(zone.base_risk_multiplier)
        base_rate = float(city.baseline_weekly_income) * 0.02
        coverage = round(min(0.40 + 0.25 * r_val, 0.65), 4)
        premium = round(base_rate * risk_multi * (1.5 - r_val), 2)
        weekly_cap = round(float(city.baseline_weekly_income) * coverage, 2)

        print(f"  OK {rd['name']} | {rd['city']} | R={r_val} | "
              f"Coverage={round(coverage*100,1)}% | Premium=Rs{premium} | Cap=Rs{weekly_cap}")

    print("Returning rider seed complete.")
    print("Demo login credentials:")
    for rd in RETURNING_RIDERS:
        print(f"  Phone: {rd['phone']}  Password: {rd['password']}")


# ── main ──────────────────────────────────────────────────────────────────────

def seed_database():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_base(db)
        if "--returning" in sys.argv:
            seed_returning_riders(db)
    except Exception as e:
        db.rollback()
        print(f"Seeding failed: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
