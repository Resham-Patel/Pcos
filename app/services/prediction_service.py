import json
from app.ml.predict import predict
from app.models.prediction_model import Prediction
from app.services.recommendation_service import get_recommendation

def predict_pcos(db, user_id, data):
    # ML Prediction
    prediction, confidence = predict(data)

    result_text = "PCOS Detected" if prediction == 1 else "No PCOS"

    # Generate Recommendation
    recommendation = get_recommendation(data, prediction)

    # Save to DB
    record = Prediction(
    user_id=user_id,
    prediction_result=result_text,
    confidence=float(confidence),
    recommendation=json.dumps(recommendation)   
)
    db.add(record)
    db.commit()

    # Return response
    return {
        "prediction": int(prediction),
        "confidence": round(confidence * 100, 2),
    }