import pickle
import pandas as pd

with open("app/ml/models/pcos_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("app/ml/models/scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

def predict(data):
    print("DATA DICT:", data)

    input_df = pd.DataFrame([{
        ' Age (yrs)': float(data["age"]),
        'Weight (Kg)': float(data["weight"]),
        'Height(Cm) ': float(data["height"]),
        'Fast food (Y/N)': int(data["fast_food"]),
        'Cycle(R/I)': int(data["cycle"]),
        'hair growth(Y/N)': int(data["hair_growth"]),
        'Skin darkening (Y/N)': int(data["skin_darkening"]),
        'Hair loss(Y/N)': int(data["hair_loss"]),
        'Pimples(Y/N)': int(data["pimples"]),
        'Reg.Exercise(Y/N)': int(data["exercise"]),
        'BMI': float(data["bmi"]),
    }])

    input_scaled = scaler.transform(input_df)

    prediction = model.predict(input_scaled)[0]
    probabilities = model.predict_proba(input_scaled)[0]
    class_index = list(model.classes_).index(prediction)
    probability = probabilities[class_index]

    print("RAW INPUT DF:")
    print(input_df)
    print("SCALED INPUT:", input_scaled)
    print("PREDICTION:", prediction)
    print("PROBABILITIES:", probabilities)
    print("CLASSES:", model.classes_)

    return int(prediction), float(probability)