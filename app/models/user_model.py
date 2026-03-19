from sqlalchemy import Column, Integer, String
from app.database import Base
# from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    # created_at = Column(DateTime, default=datetime.utcnow)