# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from app.database import get_db
# from app.schemas.symptom_schema import SymptomCreate
# from app.services.symptom_service import create_symptom, get_user_symptoms

# router = APIRouter(prefix="/symptoms", tags=["Symptoms"])

# # TEMP user_id = 1 (later JWT)
# @router.post("/add")
# def add_symptoms(data: SymptomCreate, db: Session = Depends(get_db)):
#     return create_symptom(db, user_id=1, data=data)


# @router.get("/history")
# def get_symptoms(db: Session = Depends(get_db)):
#     return get_user_symptoms(db, user_id=1)