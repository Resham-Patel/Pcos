from fastapi import APIRouter
from app.services.recommendation_service import get_recommendation

router = APIRouter(prefix="/recommendation", tags=["Recommendation"])

@router.post("/")
def generate_recommendation(data: dict):
    prediction = data.get("prediction", 0)

    return get_recommendation(data, prediction)