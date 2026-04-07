from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.symptom_model import DailyLog
from app.models.cycle_model import Cycle
from app.utils.auth import get_current_user
from app.services.chatbot_service import generate_chatbot_reply

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])


@router.post("/")
def chatbot(
    data: dict,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    message = data.get("message")

    latest_log = (
        db.query(DailyLog)
        .filter(DailyLog.user_id == user["id"])
        .order_by(DailyLog.date.desc())
        .first()
    )

    cycles = (
        db.query(Cycle)
        .filter(Cycle.user_id == user["id"])
        .all()
    )

    reply = generate_chatbot_reply(message, latest_log, cycles)

    return {"reply": reply}