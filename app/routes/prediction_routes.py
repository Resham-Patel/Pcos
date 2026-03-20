from fastapi import APIRouter
from app.schemas.prediction_schema import PredictionRequest
from app.services.prediction_service import predict_pcos

router = APIRouter(prefix="/prediction", tags=["Prediction"])

@router.post("/predict")
def predict(data: PredictionRequest):
    result = predict_pcos(data)
    return result