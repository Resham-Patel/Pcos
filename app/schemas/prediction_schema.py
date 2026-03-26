from pydantic import BaseModel

class PredictionRequest(BaseModel):
    age: int
    weight: float
    height: float
    bmi: float

    fast_food: bool
    exercise: bool
    cycle: bool

    hair_growth: bool
    skin_darkening: bool
    hair_loss: bool
    pimples: bool


class PredictionResponse(BaseModel):
    prediction: int
    confidence: float
    recommendation: str   # ✅ NEW FIELD
    
    class Config:
        from_attributes = True