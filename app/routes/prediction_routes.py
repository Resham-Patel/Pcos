from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from Pcos.app.schemas.prediction_schema import PredictionRequest
from Pcos.app.services.prediction_service import predict_pcos

# Create router
router = APIRouter(prefix="/prediction", tags=["Prediction"])

# Route
@router.post("/predict")
def predict_route(data: PredictionRequest, db: Session = Depends(get_db)):
    return predict_pcos(db, user_id=1, data=data)