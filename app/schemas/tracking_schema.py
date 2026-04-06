from pydantic import BaseModel
from datetime import date
from typing import Optional

class CycleCreate(BaseModel):
    last_period_start: date
    cycle_length: int
    period_length: int = 5

class SymptomCreate(BaseModel):
    date: date
    stress: Optional[str] = None
    sleep_hours: Optional[int] = None
    exercise_days: Optional[int] = None
    fatigue: Optional[str] = None
    mood: Optional[str] = None
    acne: Optional[str] = None
    sugar_intake: Optional[str] = None
    junk_food: Optional[str] = None
    water_intake: Optional[str] = None
    bloating: Optional[str] = None