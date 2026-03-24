import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

# Initialize client only if key exists
client = OpenAI(api_key=api_key) if api_key else None


# 🔹 Rule-based
def generate_rules(symptoms, prediction):
    rules = []

    if prediction == 1:
        rules.append("High chance of PCOS")

    if symptoms.fast_food:
        rules.append("Reduce fast food intake")

    if not symptoms.exercise:
        rules.append("Start regular exercise")

    if symptoms.cycle:
        rules.append("Monitor menstrual cycle")

    if symptoms.pimples:
        rules.append("Maintain skincare and diet")

    return rules


# 🔹 OpenAI (SAFE)
def generate_ai_recommendation(rules):
    # If no API key → skip AI
    if not client:
        return "AI recommendation not available (API key missing)"

    try:
        prompt = f"""
        Based on these conditions: {rules}
        Give short, friendly health advice for PCOS.
        """

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[{"role": "user", "content": prompt}]
        )

        return response.choices[0].message.content

    except Exception as e:
        print("OpenAI Error:", e)
        return "AI recommendation failed, showing basic advice only."


# 🔹 FINAL FUNCTION
def get_recommendation(symptoms, prediction):
    rules = generate_rules(symptoms, prediction)
    ai_output = generate_ai_recommendation(rules)

    return {
        "rule_based": rules,
        "ai_generated": ai_output
    }