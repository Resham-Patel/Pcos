from app.ml.predict import predict
from app.models.prediction_model import Prediction

def predict_pcos(db, user_id, data):
    
    prediction, confidence = predict(data)
    
    result_text = "PCOS Detected" if prediction == 1 else "No PCOS"
    
    record = Prediction(
        user_id=user_id,
        prediction_result=result_text,
        confidence=float(confidence)
    )

    db.add(record)
    db.commit()
    
    return {
        "prediction": int(prediction),   # ✅ return int (matches schema)
        "confidence": round(confidence * 100, 2)
    }