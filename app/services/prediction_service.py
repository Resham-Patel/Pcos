import json
from app.ml.predict import predict
from app.models.prediction_model import Prediction
from app.services.recommendation_service import get_recommendation

def predict_pcos(db, user_id, data):
    prediction, confidence = predict(data)

    result_text = "PCOS Detected" if prediction == 1 else "No PCOS"
    
    recommendation = get_recommendation(data, prediction)

    record = Prediction(
    user_id=user_id,
    prediction_result=result_text,
    confidence=float(confidence),
    recommendation=json.dumps(recommendation)   
)
    db.add(record)
    db.commit()

    return {
        "prediction": int(prediction),
        "confidence": round(confidence * 100, 2),
    }