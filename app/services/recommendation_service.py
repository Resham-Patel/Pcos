import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")

# Initialize client only if key exists
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key,
    default_headers={
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "FemWell",
    },
) if api_key else None

def get_value(symptoms, key):
    # Works for both dict and Pydantic object
    if isinstance(symptoms, dict):
        return symptoms.get(key)
    return getattr(symptoms, key, None)


# 🔹 Rule-based
def generate_rules(symptoms, prediction):
    rules = []

    if prediction == 1:
        rules.append("High chance of PCOS")

    if get_value(symptoms, "fast_food"):
        rules.append("Reduce fast food intake")

    if not get_value(symptoms, "exercise"):
        rules.append("Start regular exercise")

    if get_value(symptoms, "cycle"):
        rules.append("Monitor menstrual cycle")

    if get_value(symptoms, "pimples"):
        rules.append("Maintain skincare and diet")

    return rules

def generate_ai_recommendation(rules):
    if not client:
        return {
            "diet": "Focus on balanced meals, more fruits and vegetables, and reduce processed foods.",
            "exercise": "Aim for regular light-to-moderate exercise like walking or yoga.",
            "lifestyle": "Track your cycle, manage stress, and consult a healthcare professional if symptoms continue."
        }

    try:
        prompt = f"""
You are a women's health assistant.

Based on these PCOS-related findings:
{rules}

Return ONLY valid JSON in this format:
{{
  "diet": "detailed diet advice (2–3 lines, specific, not generic)",
  "exercise": "detailed exercise advice (2–3 lines, practical)",
  "lifestyle": "detailed lifestyle advice (2–3 lines, meaningful)"
}}

Rules:
- Make it personalized and helpful
- Do NOT repeat the same text as rules
- Do NOT be generic (avoid phrases like 'eat healthy', 'exercise regularly')
- Explain WHY the advice helps PCOS
- Keep it clear and user-friendly
- No markdown
"""

        response = client.chat.completions.create(
            model="openai/gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You write clear, supportive health guidance in JSON only."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=250
        )

        content = response.choices[0].message.content.strip()
        return json.loads(content)

    except Exception as e:
        print("OpenAI Error:", e)
        return {
            "diet": "Focus on balanced meals, more fruits and vegetables, and reduce processed foods.",
            "exercise": "Aim for regular light-to-moderate exercise like walking or yoga.",
            "lifestyle": "Track your cycle, manage stress, and consult a healthcare professional if symptoms continue."
        }

# 🔹 FINAL FUNCTION
def get_recommendation(symptoms, prediction):
    rules = generate_rules(symptoms, prediction)
    ai_output = generate_ai_recommendation(rules)

    return {
        "rule_based": rules,
        "ai_generated": ai_output
    }