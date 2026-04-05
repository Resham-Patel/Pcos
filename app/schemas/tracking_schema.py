from pydantic import BaseModel
from datetime import date
from typing import Optional

class CycleCreate(BaseModel):
    last_period_start: date
    cycle_length: int
    period_length: int

class SymptomCreate(BaseModel):
    date: date
    symptom_name: str
    severity: Optional[str] = None