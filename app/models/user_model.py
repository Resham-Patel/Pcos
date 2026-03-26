from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone
from app.database import Base
# from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    reset_token = Column(String, nullable=True)
    created_at = Column(DateTime,default=lambda: datetime.now(timezone.utc))