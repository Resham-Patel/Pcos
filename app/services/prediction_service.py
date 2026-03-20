from app.ml.predict import predict
from app.models.prediction_model import Prediction
from app.database import SessionLocal

def predict_pcos(data):
    db = SessionLocal()
    prediction, confidence = predict(data)

    # store in DB
    db_prediction = Prediction(
        # user_id=user_id,
        prediction_result=str(prediction),
        confidence=float(confidence)
    )
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)

    return {
        "prediction": int(prediction),
        "confidence": float(confidence)
    }