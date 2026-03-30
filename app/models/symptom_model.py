from sqlalchemy import Column, Integer, Float, Boolean, DateTime, ForeignKey
from datetime import datetime,timezone
from app.database import Base

class Symptoms(Base):
    __tablename__ = "symptoms"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    age = Column(Integer, nullable=False)
    weight = Column(Float)
    height = Column(Float)
    bmi = Column(Float)

    fast_food = Column(Boolean, default=False)
    exercise = Column(Boolean, default=False)

    cycle = Column(Boolean)  # False = Regular, True = Irregular

    hair_growth = Column(Boolean, default=False)
    skin_darkening = Column(Boolean, default=False)
    hair_loss = Column(Boolean, default=False)
    pimples = Column(Boolean, default=False)

    date = Column(DateTime, default=lambda: datetime.now(timezone.utc))
