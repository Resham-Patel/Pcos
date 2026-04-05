from sqlalchemy import Column, Integer, Date, ForeignKey
from app.database import Base

class Cycle(Base):
    __tablename__ = "cycles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    last_period_start = Column(Date)
    cycle_length = Column(Integer)
    period_length = Column(Integer)