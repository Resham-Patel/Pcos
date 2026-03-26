import pickle
import numpy as np

# load model once
with open("app/ml/models/pcos_model.pkl", "rb") as f:
    model = pickle.load(f)

def predict(data):
    input_data = np.array([[
        data.age,
        data.weight,
        data.height,
        data.bmi,
        data.fast_food,
        data.exercise,
        data.cycle,
        data.hair_growth,
        data.skin_darkening,
        data.hair_loss,
        data.pimples
    ]])

    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0][1]

    return prediction, probability