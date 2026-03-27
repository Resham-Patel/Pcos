import os
import requests
from dotenv import load_dotenv
import json
import re

load_dotenv()


OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
# Initialize client
# client = genai.Client(api_key=api_key) if api_key else None

# 🔹 Rule-based
def generate_rules(symptoms, prediction):
    rules = []

    if prediction == 1:
        rules.append("High chance of PCOS")

    if symptoms["fast_food"]:
        rules.append("Reduce fast food intake")

    if not symptoms["exercise"]:
        rules.append("Start regular exercise")

    if symptoms["cycle"]:
        rules.append("Monitor menstrual cycle")

    if symptoms["pimples"]:
        rules.append("Maintain skincare and diet")

    return rules


def generate_ai_recommendation(rules):
    if not OPENROUTER_API_KEY:
        return "AI recommendation not available"

    if not rules:
        return "No major issues detected. Maintain a healthy lifestyle."

    try:
        rules_text = "\n".join(f"- {rule}" for rule in rules)

        prompt = f"""
You are a helpful health assistant.

Based on these conditions:
{rules_text}

STRICTLY return ONLY valid JSON (no explanation, no text).

Format:
{{
  "diet": "short advice",
  "exercise": "short advice",
  "lifestyle": "short advice",
  "notes": "short advice"
}}
"""

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost",
                "X-Title": "PCOS Recommendation System"
            },
            json={
                "model": "openai/gpt-4o-mini",
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            }
        )

        result = response.json()
        content = result["choices"][0]["message"]["content"]

        # 🔥 Safe JSON parsing (IMPORTANT)
        match = re.search(r"\{.*\}", content, re.DOTALL)

        if match:
            try:
                return json.loads(match.group())
            except Exception as e:
                print("JSON Parse Error:", e)

        # fallback
        return {"raw_response": content}

    except Exception as e:
        print("OpenRouter Error:", e)
        return "AI recommendation failed"
    
# 🔹 FINAL FUNCTION
def get_recommendation(symptoms, prediction):
    rules = generate_rules(symptoms, prediction)
    ai_output = generate_ai_recommendation(rules)

    return {
        "rule_based": rules,
        "ai_generated": ai_output
    }