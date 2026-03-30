from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime,timezone
from app.database import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))   

    prediction_result = Column(String)
    confidence = Column(Float)
    recommendation = Column(String) 

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
