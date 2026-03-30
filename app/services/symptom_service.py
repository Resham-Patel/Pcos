from app.models.symptom_model import Symptoms

def create_symptom(db, user_id, data):
    new_entry = Symptoms(
        user_id=user_id,
        age=data.age,
        weight=data.weight,
        height=data.height,
        bmi=data.bmi,
        fast_food=data.fast_food,
        exercise=data.exercise,
        cycle=data.cycle,
        hair_growth=data.hair_growth,
        skin_darkening=data.skin_darkening,
        hair_loss=data.hair_loss,
        pimples=data.pimples
    )

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return new_entry


def get_user_symptoms(db, user_id):
    return db.query(Symptoms).filter(Symptoms.user_id == user_id).all()