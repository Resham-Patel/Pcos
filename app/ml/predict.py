import pickle
import numpy as np

with open("app/ml/models/pcos_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("app/ml/models/scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

def predict(data):
    input_data = np.array([[
        data.age,
        data.weight,
        data.height,
        int(data.fast_food),
        int(data.cycle),
        int(data.hair_growth),
        int(data.skin_darkening),
        int(data.hair_loss),
        int(data.pimples),
        int(data.exercise),
        data.bmi
    ]], dtype=float)

    input_data = scaler.transform(input_data)

    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0][1]

    return prediction, probability