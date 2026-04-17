import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")

# OpenAI client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key,
    default_headers={
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "FemWell",
    },
) if api_key else None


def get_value(symptoms, key):
    if isinstance(symptoms, dict):
        return symptoms.get(key)
    return getattr(symptoms, key, None)

# Risk level calculation
def get_risk_level(symptoms):
    risk_level = get_value(symptoms, "risk_level")
    if risk_level:
        return risk_level

    probability = get_value(symptoms, "probability")
    if probability is None:
        prediction = get_value(symptoms, "prediction")
        return "High Risk" if prediction == 1 else "Low Risk"

    prob = probability / 100 if probability > 1 else probability

    if prob >= 0.65:
        return "High Risk"
    elif prob >= 0.35:
        return "Moderate Risk"
    return "Low Risk"

# Rule-based recommendations
def generate_rules(symptoms, prediction, risk_level):
    rules = []

    if risk_level == "High Risk":
        rules.append("Your current symptom pattern suggests a higher risk profile")
    elif risk_level == "Moderate Risk":
        rules.append("Your current symptom pattern suggests a moderate risk profile")
    else:
        rules.append("Your current symptom pattern suggests a lower risk profile")

    if get_value(symptoms, "fast_food"):
        if risk_level == "Low Risk":
            rules.append("Reduce fast food intake to support hormonal balance")
        else:
            rules.append("Reduce fast food intake to help improve metabolic and hormonal health")

    if not get_value(symptoms, "exercise"):
        if risk_level == "Low Risk":
            rules.append("Add regular exercise to maintain overall wellness")
        else:
            rules.append("Start regular exercise to support cycle and metabolic health")

    if get_value(symptoms, "cycle"):
        rules.append("Track menstrual cycle changes regularly")

    if get_value(symptoms, "pimples"):
        rules.append("Support skin health with balanced diet and hydration")

    if get_value(symptoms, "skin_darkening"):
        rules.append("Monitor skin changes as part of your hormonal health tracking")

    if get_value(symptoms, "hair_growth"):
        rules.append("Track excess hair growth patterns over time")

    if get_value(symptoms, "hair_loss"):
        rules.append("Monitor hair fall changes and overall scalp health")

    return rules

# short recommendations based on risk level
def get_fallback_recommendation(risk_level):
    if risk_level == "High Risk":
        return {
            "diet": "Focus on whole foods, higher-fiber meals, lean proteins, and fewer processed foods. Reducing excess sugar and fast food may help support insulin balance and hormone regulation.",
            "exercise": "Aim for regular exercise such as brisk walking, yoga, cycling, or strength training at least 4 to 5 times a week. Consistency is important for metabolic and menstrual health.",
            "lifestyle": "Track your cycle, manage stress, sleep well, and consider consulting a gynecologist or endocrinologist for a more complete evaluation."
        }

    if risk_level == "Moderate Risk":
        return {
            "diet": "Build meals around vegetables, fruits, whole grains, and protein-rich foods while reducing frequent fast food and sugary snacks. This can support hormonal balance and energy levels.",
            "exercise": "Try moderate physical activity like walking, yoga, dance, or light strength work several times a week to improve overall fitness and support healthy hormone patterns.",
            "lifestyle": "Keep a symptom and cycle tracker, maintain regular sleep, and manage stress with routines that are easy to sustain."
        }

    return {
        "diet": "Maintain a balanced eating pattern with whole foods, fruits, vegetables, and enough protein. Limiting frequent junk food can help preserve long-term hormonal wellness.",
        "exercise": "Stay active with regular movement such as walking, yoga, stretching, or sports to support general fitness and future hormonal health.",
        "lifestyle": "Keep tracking your cycle, sleep well, manage stress, and continue healthy habits to maintain a lower-risk pattern."
    }

# Generate AI Recommendation
def generate_ai_recommendation(rules, risk_level):
    if not client:
        return get_fallback_recommendation(risk_level)

    try:
        prompt = f"""
You are a women's health assistant.

The user currently falls into this category:
{risk_level}

Based on these health findings:
{rules}

Return ONLY valid JSON in this format:
{{
  "diet": "detailed diet advice (2–3 lines, specific, user-friendly)",
  "exercise": "detailed exercise advice (2–3 lines, practical)",
  "lifestyle": "detailed lifestyle advice (2–3 lines, meaningful)"
}}

Rules:
- Personalize the response based on the risk level
- If risk level is Low Risk, do NOT write as if the user already has PCOS
- For Low Risk, focus on prevention, balance, healthy habits, and tracking
- For Moderate Risk, focus on symptom support, improvement, and monitoring
- For High Risk, focus on stronger lifestyle support and medical follow-up
- Do NOT repeat the same text as the rules
- Avoid generic phrases like "eat healthy" or "exercise regularly"
- Keep the tone supportive and clear
- No markdown
"""

        response = client.chat.completions.create(
            model="openai/gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You write supportive, personalized women's health guidance in valid JSON only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.5,
            max_tokens=300,
        )

        content = response.choices[0].message.content.strip()
        return json.loads(content)

    except Exception as e:
        print("OpenAI Error:", e)
        return get_fallback_recommendation(risk_level)

# Get Recommendations
def get_recommendation(symptoms, prediction):
    risk_level = get_risk_level(symptoms)
    rules = generate_rules(symptoms, prediction, risk_level)
    ai_output = generate_ai_recommendation(rules, risk_level)

    return {
        "risk_level": risk_level,
        "rule_based": rules,
        "ai_generated": ai_output
    }