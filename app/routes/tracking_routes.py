from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.cycle_model import Cycle
from app.models.symptom_model import DailyLog
from app.schemas.tracking_schema import CycleCreate, SymptomCreate
from app.utils.auth import get_current_user

router = APIRouter(prefix="/tracking", tags=["Tracking"])

# ------------------ CYCLE ------------------

@router.post("/cycle")
def save_cycle(data: CycleCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    cycle = db.query(Cycle).filter(Cycle.user_id == user["id"]).first()

    if cycle:
        cycle.last_period_start = data.last_period_start
        cycle.cycle_length = data.cycle_length
        cycle.period_length = data.period_length
    else:
        cycle = Cycle(
            user_id=user["id"],
            last_period_start=data.last_period_start,
            cycle_length=data.cycle_length,
            period_length=data.period_length
        )
        db.add(cycle)

    db.commit()
    return {"message": "Cycle saved"}

@router.get("/cycle")
def get_cycle(db: Session = Depends(get_db), user=Depends(get_current_user)):
    cycle = db.query(Cycle).filter(Cycle.user_id == user["id"]).first()

    if not cycle:
        return {}

    return {
        "last_period_start": cycle.last_period_start,
        "cycle_length": cycle.cycle_length,
        "period_length": cycle.period_length
    }
    
    
# ------------------ SYMPTOMS ------------------
@router.post("/symptoms")
def save_symptoms(
    data: SymptomCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    log = DailyLog(
        user_id=user["id"],
        date=data.date,
        symptom_name=data.symptom_name,
        severity=data.severity
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return {
        "message": "Symptoms saved",
        "data": {
            "id": log.id,
            "date": log.date,
            "symptom_name": log.symptom_name,
            "severity": log.severity
        }
    }


@router.get("/symptoms")
def get_symptoms(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    logs = db.query(DailyLog).filter(DailyLog.user_id == user["id"]).all()

    return [
        {
            "id": log.id,
            "date": log.date,
            "symptom_name": log.symptom_name,
            "severity": log.severity
        }
        for log in logs
    ]