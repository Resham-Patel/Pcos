from sqlalchemy import Column, Integer, Date, String, ForeignKey
from app.database import Base

class DailyLog(Base):
    __tablename__ = "daily_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False)
    symptom_name = Column(String, nullable=False)   # Acne, Fatigue, Cravings, etc.
    severity = Column(String, nullable=True)        # mild, medium, severe