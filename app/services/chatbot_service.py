import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")

print("API Key Loaded:", api_key)
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key,
    default_headers={
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "FemWell",
    },
) if api_key else None


# ----------------RULE-BASED FIRST------------------------
def rule_based_reply(message, log):
    message = message.lower()

    if "diet" in message:
        return "Focus on low sugar, high protein, and fiber-rich foods for PCOS."

    if "exercise" in message:
        return "Walking, yoga, and strength training help regulate hormones."

    if "cycle" in message:
        if log and log.stress == "high":
            return "High stress may delay your cycle. Try relaxation techniques."
        return "Cycle depends on hormones, stress, sleep, and lifestyle."

    return None


# ------------------AI RESPONSE (OPENROUTER)----------------
def ai_chat_reply(message, log, cycles):
    if not client:
        return "AI service not available. Please try again later."

    try:
        context = ""

        #  FULL HEALTH LOG
        if log:
            context += f"""
User Health Data:
- Stress: {log.stress}
- Sleep Hours: {log.sleep_hours}
- Exercise Days: {log.exercise_days}
- Fatigue: {log.fatigue}
- Mood: {log.mood}
- Acne: {log.acne}
- Sugar Intake: {log.sugar_intake}
- Junk Food: {log.junk_food}
- Water Intake: {log.water_intake}
- Bloating: {log.bloating}
"""

        #  CYCLE DATA 
        if cycles:
            last_cycles = cycles[-3:] if len(cycles) >= 3 else cycles
            cycle_info = [
                f"{c.cycle_length} days (start: {c.last_period_start})"
                for c in last_cycles
            ]

            context += f"""
Cycle History:
- Total Records: {len(cycles)}
- Recent Cycles: {cycle_info}
"""

        #  FINAL PROMPT
        prompt = f"""
You are a smart PCOS health assistant.

User Question:
{message}

User Context:
{context}

Instructions:
- Give personalized answer based on user data
- Explain WHY (important)
- Keep it simple (2–4 lines)
- Be supportive, not generic
- No markdown
"""

        response = client.chat.completions.create(
            model="openai/gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful PCOS assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.6,
            max_tokens=150,
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("Chatbot Error:", e)
        return "Something went wrong. Please try again."

# ------------------ FINAL FUNCTION ---------------------
def generate_chatbot_reply(message, log, cycles):
    rule = rule_based_reply(message, log)
    if rule:
        return rule

    return ai_chat_reply(message, log, cycles)