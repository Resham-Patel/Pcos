from sqlalchemy import Column, Integer, Date, ForeignKey
from app.database import Base

class Cycle(Base):
    __tablename__ = "cycles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    last_period_start = Column(Date, nullable=False)
    cycle_length = Column(Integer, nullable=False)
    period_length = Column(Integer, nullable=False, default=5)