from app.ml.predict import predict
from app.models.prediction_model import Prediction

def predict_pcos(db, user_id, data):
    
    prediction, confidence = predict(data)

    record = Prediction(
        user_id=user_id,
        input_data=data.dict(),
        prediction=int(prediction),
        confidence=float(confidence)
    )

    db.add(record)
    db.commit()
    
    return {
        "prediction": "PCOS Detected" if prediction == 1 else "No PCOS",
        "confidence": round(confidence * 100, 2)
    }