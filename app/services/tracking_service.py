from datetime import timedelta


def calculate_adjustment_from_logs(logs):
    if not logs:
        return 0

    total_score = 0

    for log in logs:
        log_score = 0

        if log.stress == "medium":
            log_score += 1
        elif log.stress == "high":
            log_score += 2

        if log.sleep_hours is not None:
            if log.sleep_hours < 5:
                log_score += 2
            elif log.sleep_hours < 7:
                log_score += 1

        if log.exercise_days is not None:
            if log.exercise_days == 0:
                log_score += 1
            elif log.exercise_days >= 4:
                log_score -= 1

        if log.fatigue == "yes":
            log_score += 1

        if log.mood in ["low", "anxious", "irritated"]:
            log_score += 1

        if log.acne == "yes":
            log_score += 1

        if log.sugar_intake == "moderate":
            log_score += 1
        elif log.sugar_intake == "high":
            log_score += 2

        if log.junk_food == "sometimes":
            log_score += 1
        elif log.junk_food == "frequent":
            log_score += 2

        if log.water_intake == "low":
            log_score += 1

        if log.bloating == "yes":
            log_score += 1

        total_score += log_score
    # return total_score
    if total_score <= 2:
        return 0
    elif total_score <= 5:
        return 2
    elif total_score <= 10:
        return 5
    elif total_score <= 15:
        return 8
    elif total_score <= 20:
        return 12
    else:
        return 15


def predict_next_period_logic(cycles, logs):
    if not cycles:
        return {
            "message": "No cycle records found",
            "last_n_cycle_lengths": [],
            "base_cycle_length": None,
            "adjustment_score": 0,
            "predicted_cycle_length": None,
            "last_period_start": None,
            "predicted_next_period": None,
            "logs_used": 0,
        }

    usable_cycles = cycles[-3:]
    cycle_lengths = [c.cycle_length for c in usable_cycles]
    base_cycle = round(sum(cycle_lengths) / len(cycle_lengths))

    adjustment = calculate_adjustment_from_logs(logs)
    
    predicted_cycle_length = base_cycle + adjustment
    # predicted_cycle_length = max(21, min(predicted_cycle_length, 60))

    last_period_start = cycles[-1].last_period_start
    predicted_next_period = last_period_start + timedelta(days=predicted_cycle_length)

    return {
        "message": f"Prediction generated using last {len(usable_cycles)} cycle record(s) and {len(logs)} weekly health log(s)",
        "last_n_cycle_lengths": cycle_lengths,
        "base_cycle_length": base_cycle,
        "adjustment_score": adjustment,
        "predicted_cycle_length": predicted_cycle_length,
        "last_period_start": last_period_start,
        "predicted_next_period": predicted_next_period,
        "logs_used": len(logs),
    }