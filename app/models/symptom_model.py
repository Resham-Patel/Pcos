from sqlalchemy import Column, Integer, Float, Boolean, DateTime, ForeignKey
from datetime import datetime
from app.database import Base

class Symptoms(Base):
    __tablename__ = "symptoms"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    age = Column(Integer)
    weight = Column(Float)
    height = Column(Float)
    bmi = Column(Float)

    fast_food = Column(Boolean)
    exercise = Column(Boolean)

    cycle = Column(Boolean)  # 0 -> Regular, 1 -> Irregular

    hair_growth = Column(Boolean)
    skin_darkening = Column(Boolean)
    hair_loss = Column(Boolean)
    pimples = Column(Boolean)

    date = Column(DateTime, default=datetime.utcnow)