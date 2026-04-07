# from pydantic import BaseModel
# from datetime import datetime

# class SymptomCreate(BaseModel):
#     age: int
#     weight: float
#     height: float
#     bmi: float

#     fast_food: bool
#     exercise: bool
#     cycle: bool

#     hair_growth: bool
#     skin_darkening: bool
#     hair_loss: bool
#     pimples: bool


# class SymptomResponse(SymptomCreate):
#     id: int
#     user_id: int
#     date: datetime

#     class Config:
#         from_attributes = True