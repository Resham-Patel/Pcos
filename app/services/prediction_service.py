from app.ml.predict import predict
import json
from app.models.prediction_model import Prediction
from app.services.recommendation_service import get_recommendation

def predict_pcos(db, user_id, data):
    # Step 1: ML Prediction
    prediction, confidence = predict(data)

    result_text = "PCOS Detected" if prediction == 1 else "No PCOS"

    # Step 2: Generate Recommendation
    recommendation = get_recommendation(data, prediction)

    # Step 3: Save to DB
    record = Prediction(
        user_id=user_id,
        prediction_result=result_text,
        confidence=float(confidence),
         recommendation=json.dumps(recommendation)     # ✅ NEW FIELD (make sure column exists)
    )

    db.add(record)
    db.commit()

    # Step 4: Return response
    return {
        "prediction": int(prediction),
        "confidence": round(confidence * 100, 2),
        "recommendation": recommendation   # ✅ include in API response
    }