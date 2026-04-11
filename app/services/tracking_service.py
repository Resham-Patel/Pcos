from datetime import timedelta

# Adjustment from symptomns log
def calculate_adjustment(log):
    score = 0

    if not log:
        return score

    if log.stress == "medium":
        score += 1
    elif log.stress == "high":
        score += 2

    if log.sleep_hours is not None:
        if log.sleep_hours < 5:
            score += 2
        elif log.sleep_hours < 7:
            score += 1

    if log.exercise_days is not None:
        if log.exercise_days == 0:
            score += 1
        elif log.exercise_days >= 4:
            score -= 1

    if log.fatigue == "yes":
        score += 1

    if log.mood in ["low", "anxious", "irritated"]:
        score += 1

    if log.acne == "yes":
        score += 1

    if log.sugar_intake == "moderate":
        score += 1
    elif log.sugar_intake == "high":
        score += 2

    if log.junk_food == "sometimes":
        score += 1
    elif log.junk_food == "frequent":
        score += 2

    if log.water_intake == "low":
        score += 1

    if log.bloating == "yes":
        score += 1

    return score

# Next period prediction 
def predict_next_period_logic(cycles, recent_log):
    if not cycles:
        return {
            "message": "No cycle records found",
            "last_n_cycle_lengths": [],
            "base_cycle_length": None,
            "adjustment_score": 0,
            "predicted_cycle_length": None,
            "last_period_start": None,
            "predicted_next_period": None,
        }

    usable_cycles = cycles[-3:]
    cycle_lengths = [c.cycle_length for c in usable_cycles]
    base_cycle = round(sum(cycle_lengths) / len(cycle_lengths))

    adjustment = calculate_adjustment(recent_log)

    predicted_cycle_length = base_cycle + adjustment
    predicted_cycle_length = max(21, min(predicted_cycle_length, 60))

    last_period_start = cycles[-1].last_period_start
    predicted_next_period = last_period_start + timedelta(days=predicted_cycle_length)

    return {
        "message": f"Prediction generated using last {len(usable_cycles)} cycle record(s)",
        "last_n_cycle_lengths": cycle_lengths,
        "base_cycle_length": base_cycle,
        "adjustment_score": adjustment,
        "predicted_cycle_length": predicted_cycle_length,
        "last_period_start": last_period_start,
        "predicted_next_period": predicted_next_period,
    }