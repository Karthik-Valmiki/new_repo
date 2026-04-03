"""
One-time fix: set reliability_score default to 0.00 and reset any
new riders that got the wrong 1.0 default from the DB.
Run from backend/ with the venv active:
  python fix_db.py
"""
from sqlalchemy import create_engine, text
import os, sys

sys.path.insert(0, os.path.dirname(__file__))
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)
with engine.begin() as conn:
    conn.execute(text(
        "ALTER TABLE rider_profiles ALTER COLUMN reliability_score SET DEFAULT 0.00"
    ))
    result = conn.execute(text(
        """
        UPDATE rider_profiles
        SET reliability_score = 0.00
        WHERE reliability_score = 1.00
          AND total_payouts_received = 0
          AND total_premium_paid = 0
        """
    ))
    print(f"reliability_score default fixed. {result.rowcount} rider(s) reset to 0.00.")
