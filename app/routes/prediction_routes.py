from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.prediction_schema import PredictionRequest
from app.services.prediction_service import predict_pcos
from app.utils.auth import get_current_user

router = APIRouter(prefix="/prediction", tags=["Prediction"])

@router.post("/predict")
def predict_route(
    data: PredictionRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return predict_pcos(
        db,
        user_id=current_user["id"],  
        data=data
    )