from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.cycle_model import Cycle
from app.models.symptom_model import DailyLog
from app.schemas.tracking_schema import CycleCreate, SymptomCreate
from app.utils.auth import get_current_user
from app.services.tracking_service import predict_next_period_logic

router = APIRouter(prefix="/tracking", tags=["Tracking"])


@router.post("/cycle")
def save_cycle(
    data: CycleCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    cycle = Cycle(
        user_id=user,
        last_period_start=data.last_period_start,
        cycle_length=data.cycle_length,
        period_length=data.period_length
    )
    db.add(cycle)
    db.commit()
    db.refresh(cycle)

    return {
        "message": "Cycle saved",
        "data": {
            "id": cycle.id,
            "last_period_start": cycle.last_period_start,
            "cycle_length": cycle.cycle_length,
            "period_length": cycle.period_length
        }
    }


@router.get("/cycles")
def get_cycles(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    cycles = (
        db.query(Cycle)
        .filter(Cycle.user_id == user)
        .order_by(Cycle.last_period_start.asc())
        .all()
    )

    return [
        {
            "id": c.id,
            "last_period_start": c.last_period_start,
            "cycle_length": c.cycle_length,
            "period_length": c.period_length
        }
        for c in cycles
    ]


@router.post("/symptoms")
def save_symptoms(
    data: SymptomCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    log = DailyLog(
        user_id=user,
        date=data.date,
        stress=data.stress,
        sleep_hours=data.sleep_hours,
        exercise_days=data.exercise_days,
        fatigue=data.fatigue,
        mood=data.mood,
        acne=data.acne,
        sugar_intake=data.sugar_intake,
        junk_food=data.junk_food,
        water_intake=data.water_intake,
        bloating=data.bloating
    )
    db.add(log)
    db.commit()
    db.refresh(log)

    return {
        "message": "Health log saved",
        "data": {
            "id": log.id,
            "date": log.date
        }
    }


@router.get("/symptoms")
def get_symptoms(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    logs = (
        db.query(DailyLog)
        .filter(DailyLog.user_id == user)
        .order_by(DailyLog.date.desc())
        .all()
    )

    return [
        {
            "id": log.id,
            "date": log.date,
            "stress": log.stress,
            "sleep_hours": log.sleep_hours,
            "exercise_days": log.exercise_days,
            "fatigue": log.fatigue,
            "mood": log.mood,
            "acne": log.acne,
            "sugar_intake": log.sugar_intake,
            "junk_food": log.junk_food,
            "water_intake": log.water_intake,
            "bloating": log.bloating
        }
        for log in logs
    ]


@router.get("/predict-next-period")
def predict_next_period(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    cycles = (
        db.query(Cycle)
        .filter(Cycle.user_id == user)
        .order_by(Cycle.last_period_start.asc())
        .all()
    )

    recent_log = (
        db.query(DailyLog)
        .filter(DailyLog.user_id == user)
        .order_by(DailyLog.date.desc())
        .first()
    )

    return predict_next_period_logic(cycles, recent_log)