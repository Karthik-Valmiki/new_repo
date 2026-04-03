from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..schemas.trigger import TriggerCreate, TriggerResponse
from ..services.trigger_engine import activate_trigger

router = APIRouter(prefix="/triggers", tags=["Triggers"])

VALID_METRIC_TYPES = {"WEATHER", "AQI", "PLATFORM_BLACKOUT", "SOCIAL_DISRUPTION"}
VALID_INTENSITY = {"LOW", "MEDIUM", "HIGH", "CRITICAL"}


@router.post("/simulate", response_model=TriggerResponse)
def simulate_trigger(
    data: TriggerCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Simulate a parametric trigger event for a zone.
    System auto-finds all active policies in that zone and queues payouts.
    No manual rider input needed.
    """
    if data.metric_type not in VALID_METRIC_TYPES:
        raise HTTPException(status_code=400, detail=f"metric_type must be one of {VALID_METRIC_TYPES}")
    if data.intensity_level not in VALID_INTENSITY:
        raise HTTPException(status_code=400, detail=f"intensity_level must be one of {VALID_INTENSITY}")
    try:
        return activate_trigger(data, db, background_tasks)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
