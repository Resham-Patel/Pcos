from sqlalchemy import Column, Integer, Date, String, ForeignKey
from app.database import Base

class DailyLog(Base):
    __tablename__ = "daily_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    date = Column(Date, nullable=False)

    stress = Column(String, nullable=True)          # low, medium, high
    sleep_hours = Column(Integer, nullable=True)    # e.g. 5, 6, 7
    exercise_days = Column(Integer, nullable=True)  # 0 to 7
    fatigue = Column(String, nullable=True)         # yes / no
    mood = Column(String, nullable=True)            # happy, okay, low, anxious
    acne = Column(String, nullable=True)            # yes / no
    sugar_intake = Column(String, nullable=True)    # low, moderate, high
    junk_food = Column(String, nullable=True)       # rare, sometimes, frequent
    water_intake = Column(String, nullable=True)    # low, good
    bloating = Column(String, nullable=True)        # yes / no