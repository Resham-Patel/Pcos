import React, { useEffect, useMemo, useState } from "react";
import "../styles/tracking.css";
import {
  getCycles,
  saveCycle,
  getSymptoms,
  logSymptom,
  getPrediction,
} from "../services/api";

const TrackingPage = () => {
  const [cycles, setCycles] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [showCycleForm, setShowCycleForm] = useState(false);
  const [showSymptomForm, setShowSymptomForm] = useState(false);

  const [cycleForm, setCycleForm] = useState({
    last_period_start: "",
    cycle_length: "",
    period_length: 5,
  });

  const [symptomForm, setSymptomForm] = useState({
    date: new Date().toISOString().split("T")[0],
    stress: "",
    sleep_hours: "",
    exercise_days: "",
    fatigue: "",
    mood: "",
    acne: "",
    sugar_intake: "",
    junk_food: "",
    water_intake: "",
    bloating: "",
  });

  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    fetchTrackingData();
  }, []);

  const fetchTrackingData = async () => {
    try {
      const [cyclesRes, symptomsRes] = await Promise.all([
        getCycles(),
        getSymptoms(),
      ]);

      setCycles(cyclesRes.data || []);
      setSymptoms(symptomsRes.data || []);

      try {
        const predictionRes = await getPrediction();
        setPrediction(predictionRes.data);
      } catch (predictionErr) {
        setPrediction(null);
        console.log("Prediction not available yet:", predictionErr);
      }
    } catch (err) {
      console.log("Tracking fetch error:", err);
    }
  };

  const latestCycle = cycles.length > 0 ? cycles[cycles.length - 1] : null;

  const cycleLength =
    prediction?.predicted_cycle_length || latestCycle?.cycle_length || 28;

  const periodLength = latestCycle?.period_length || 5;

  const lastPeriodStart = useMemo(() => {
    if (prediction?.last_period_start) return new Date(prediction.last_period_start);
    if (latestCycle?.last_period_start) return new Date(latestCycle.last_period_start);
    return null;
  }, [prediction, latestCycle]);

  const predictedNextPeriodDate = prediction?.predicted_next_period
    ? new Date(prediction.predicted_next_period)
    : null;

  const monthLabel = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isSameDate = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const dayDiff = (date1, date2) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / oneDay);
  };

  const getCycleDay = (date) => {
    if (!lastPeriodStart) return null;
    const diff = dayDiff(lastPeriodStart, date);
    if (diff < 0) return null;
    return diff % cycleLength;
  };

  const isPeriodDay = (date) => {
    const cycleDay = getCycleDay(date);
    return cycleDay !== null && cycleDay >= 0 && cycleDay < periodLength;
  };

  const isSymptomDay = (date) => {
    return symptoms.some((symptom) => {
      const symptomDate = new Date(symptom.log_date || symptom.date);
      return isSameDate(symptomDate, date);
    });
  };

  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let startWeekday = firstDayOfMonth.getDay();
    startWeekday = startWeekday === 0 ? 6 : startWeekday - 1;

    const daysInMonth = lastDayOfMonth.getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = startWeekday - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        day: prevMonthLastDay - i,
        muted: true,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        day,
        muted: false,
      });
    }

    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        day: i,
        muted: true,
      });
    }

    return days;
  }, [currentMonth]);

  const logsSinceLastPeriod = useMemo(() => {
    if (!lastPeriodStart) return [];

    const start = new Date(lastPeriodStart);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return symptoms
      .filter((symptom) => {
        const symptomDate = new Date(symptom.log_date || symptom.date);
        return symptomDate >= start && symptomDate <= end;
      })
      .sort(
        (a, b) =>
          new Date(a.log_date || a.date) - new Date(b.log_date || b.date)
      );
  }, [symptoms, lastPeriodStart]);

  const nextPeriodStart = predictedNextPeriodDate;

  const daysUntilNextPeriod = nextPeriodStart
    ? Math.max(dayDiff(today, nextPeriodStart), 0)
    : null;

  const cyclePhase = useMemo(() => {
    if (!lastPeriodStart) return "Add cycle records";
    const cycleDay = getCycleDay(today);
    if (cycleDay === null) return "Follicular Phase";
    if (cycleDay < periodLength) return "Menstrual Phase";
    if (cycleDay < 13) return "Follicular Phase";
    if (cycleDay < 16) return "Ovulation Phase";
    return "Luteal Phase";
  }, [cycleLength, periodLength, lastPeriodStart, today]);

  const formattedNextPeriod = nextPeriodStart
    ? nextPeriodStart.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    })
    : "--";

  const goToPrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleCycleChange = (e) => {
    const { name, value } = e.target;
    setCycleForm((prev) => ({
      ...prev,
      [name]:
        name === "cycle_length" || name === "period_length"
          ? Number(value)
          : value,
    }));
  };

  const handleSymptomChange = (e) => {
    const { name, value } = e.target;
    setSymptomForm((prev) => ({
      ...prev,
      [name]:
        name === "sleep_hours" || name === "exercise_days"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSaveCycle = async (e) => {
    e.preventDefault();

    try {
      await saveCycle(cycleForm);
      await fetchTrackingData();

      setCycleForm({
        last_period_start: "",
        cycle_length: "",
        period_length: 5,
      });

      setShowCycleForm(false);
      alert("Cycle saved successfully");
    } catch (err) {
      console.log("Save cycle error:", err);
      alert("Failed to save cycle");
    }
  };

  const handleLogSymptoms = async (e) => {
    e.preventDefault();
    try {
      await logSymptom(symptomForm);
      await fetchTrackingData();
      setSymptomForm({
        date: new Date().toISOString().split("T")[0],
        stress: "", sleep_hours: "", exercise_days: "",
        fatigue: "", mood: "", acne: "", sugar_intake: "",
        junk_food: "", water_intake: "", bloating: "",
      });
      setShowSymptomForm(false);
      alert("Weekly health log saved successfully");
    } catch (err) {
      const message = err.response?.data?.detail || "Failed to save health log";
      alert(message);
    }
  };


  return (
    <div className="tracking-page">
      <div className="tracking-container">
        <section className="hero-text">
          <h1>Cycle Tracking</h1>
          <p>
            Your cycle is in the <span>{cyclePhase}</span>. Prediction is based on
            your last 3 cycle records and all health logs from your last period till today.
          </p>
        </section>

        <section className="top-section">
          <div className="left-column">
            <div className="card calendar-card">
              <div className="card-header">
                <div>
                  <h2>Cycle Tracking</h2>
                  <p>{monthLabel}</p>
                </div>

                <div className="calendar-arrows">
                  <button onClick={goToPrevMonth}>‹</button>
                  <button onClick={goToNextMonth}>›</button>
                </div>
              </div>

              <div className="weekdays">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>

              <div className="calendar-grid">
                {calendarData.map((item, index) => {
                  const isToday = isSameDate(item.date, today);
                  const isPeriod = isPeriodDay(item.date);
                  const hasSymptom = isSymptomDay(item.date);

                  return (
                    <div
                      key={index}
                      className={`calendar-day
                        ${item.muted ? "muted" : ""}
                        ${isPeriod ? "period-day" : ""}
                        ${isToday ? "active" : ""}
                        ${hasSymptom ? "symptom-day" : ""}
                      `}
                    >
                      {item.day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card next-period-card">
              <div className="small-icon">🩸</div>
              <p className="label">Next Period</p>

              <h2>
                {prediction?.predicted_next_period && daysUntilNextPeriod !== null
                  ? `${daysUntilNextPeriod} Days`
                  : "--"}
              </h2>

              <p className="sub-label">
                Predicted: {prediction?.predicted_next_period ? formattedNextPeriod : "--"}
              </p>

              {cycles.length < 3 && (
                <p className="sub-label disclaimer-text">
                  Please add at least 3 cycle records to enable prediction.
                </p>
              )}

              {prediction?.message && (
                <p className="sub-label">{prediction.message}</p>
              )}

              {prediction?.logs_used !== undefined && (
                <p className="sub-label">Logs used: {prediction.logs_used}</p>
              )}

              {prediction?.base_cycle_length && (
                <p className="sub-label">
                  Base: {prediction.base_cycle_length} days • Adjustment:{" "}
                  {prediction.adjustment_score >= 0
                    ? `+${prediction.adjustment_score}`
                    : prediction.adjustment_score}
                </p>
              )}

              <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                <button
                  className="primary-btn"
                  onClick={() => setShowCycleForm(true)}
                >
                  Add Cycle
                </button>
                <button
                  className="primary-btn"
                  onClick={() => setShowSymptomForm(true)}
                >
                  Log Weekly Health
                </button>
              </div>
            </div>
          </div>
        </section>

        {showCycleForm && (
          <section className="card symptom-form-card">
            <div className="section-header">
              <h2>Add Cycle Record</h2>
            </div>

            <form onSubmit={handleSaveCycle} className="symptom-form">
              <div className="input-group">
                <label>Last Period Start</label>
                <input
                  type="date"
                  name="last_period_start"
                  value={cycleForm.last_period_start}
                  onChange={handleCycleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Cycle Length (days)</label>
                <input
                  type="number"
                  name="cycle_length"
                  value={cycleForm.cycle_length}
                  onChange={handleCycleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Period Length (days)</label>
                <input
                  type="number"
                  name="period_length"
                  value={cycleForm.period_length}
                  onChange={handleCycleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="primary-btn">
                  Save Cycle
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowCycleForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {showSymptomForm && (
          <section className="card symptom-form-card">
            <div className="section-header">
              <h2>Enter Weekly Health Log</h2>
            </div>

            <form onSubmit={handleLogSymptoms} className="symptom-form">
              <div className="input-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={symptomForm.date}
                  onChange={handleSymptomChange}
                  required
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="input-group">
                <label>Stress</label>
                <select
                  name="stress"
                  value={symptomForm.stress}
                  onChange={handleSymptomChange}
                >
                  <option value="">Select stress</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="input-group">
                <label>Sleep Hours</label>
                <input
                  type="number"
                  name="sleep_hours"
                  value={symptomForm.sleep_hours}
                  onChange={handleSymptomChange}
                  min="0"
                  max="24"
                />
              </div>

              <div className="input-group">
                <label>Exercise Days / Week</label>
                <input
                  type="number"
                  name="exercise_days"
                  value={symptomForm.exercise_days}
                  onChange={handleSymptomChange}
                  min="0"
                  max="7"
                />
              </div>

              <div className="input-group">
                <label>Fatigue</label>
                <select
                  name="fatigue"
                  value={symptomForm.fatigue}
                  onChange={handleSymptomChange}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="input-group">
                <label>Mood</label>
                <select
                  name="mood"
                  value={symptomForm.mood}
                  onChange={handleSymptomChange}
                >
                  <option value="">Select mood</option>
                  <option value="happy">Happy</option>
                  <option value="okay">Okay</option>
                  <option value="low">Low</option>
                  <option value="anxious">Anxious</option>
                  <option value="irritated">Irritated</option>
                </select>
              </div>

              <div className="input-group">
                <label>Acne</label>
                <select
                  name="acne"
                  value={symptomForm.acne}
                  onChange={handleSymptomChange}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="input-group">
                <label>Sugar Intake</label>
                <select
                  name="sugar_intake"
                  value={symptomForm.sugar_intake}
                  onChange={handleSymptomChange}
                >
                  <option value="">Select sugar intake</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="input-group">
                <label>Junk Food</label>
                <select
                  name="junk_food"
                  value={symptomForm.junk_food}
                  onChange={handleSymptomChange}
                >
                  <option value="">Select frequency</option>
                  <option value="rare">Rare</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="frequent">Frequent</option>
                </select>
              </div>

              <div className="input-group">
                <label>Water Intake</label>
                <select
                  name="water_intake"
                  value={symptomForm.water_intake}
                  onChange={handleSymptomChange}
                >
                  <option value="">Select</option>
                  <option value="good">Good</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="input-group">
                <label>Bloating</label>
                <select
                  name="bloating"
                  value={symptomForm.bloating}
                  onChange={handleSymptomChange}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="primary-btn">
                  Save Weekly Health Log
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowSymptomForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="metrics-section">
          <div className="section-header">
            <h2>Health Metrics</h2>
          </div>

          <div className="metrics">
            <div className="metric-card">
              <div className="metric-top">
                <div className="metric-icon">📅</div>
                <span className="green-badge">{cycles.length} Records</span>
              </div>
              <p className="metric-title">Cycle History</p>
              <h3>{cycleLength}d</h3>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <div className="metric-icon">🩺</div>
                <span className="pink-badge">
                  {logsSinceLastPeriod.length} Logs
                </span>
              </div>
              <p className="metric-title">Logs Since Last Period</p>
              <h3>{logsSinceLastPeriod.length}</h3>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <div className="metric-icon">✨</div>
                <span className="gray-badge">Rule Based</span>
              </div>
              <p className="metric-title">Prediction Type</p>
              <h3>{prediction?.predicted_cycle_length || "--"}d</h3>
            </div>
          </div>
        </section>

        <section className="symptoms-section">
          <div className="section-header">
            <h2>Recent Health Logs</h2>
          </div>

          <div className="symptoms-row">
            {logsSinceLastPeriod.length > 0 ? (
              logsSinceLastPeriod
                .slice(-4)
                .reverse()
                .map((log, index) => (
                  <div className="symptom-pill" key={log.id || index}>
                    <div className="symptom-icon pink-lite">HL</div>
                    <div>
                      <h4>{new Date(log.log_date || log.date).toDateString()}</h4>
                      <p>
                        {[
                          log.stress && `Stress: ${log.stress}`,
                          log.fatigue && `Fatigue: ${log.fatigue}`,
                          log.mood && `Mood: ${log.mood}`,
                          log.sugar_intake && `Sugar: ${log.sugar_intake}`,
                        ]
                          .filter(Boolean)
                          .join(" • ") || "Health log saved"}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <p>No health logs since last period yet.</p>
            )}
          </div>
        </section>

        <section className="guide-card">
          <div className="guide-content">
            <div className="guide-text">
              <h2>Personalized PCOS Guide</h2>
              <p>
                Based on your cycle history and health logs since your last period,
                your next period estimate is dynamically adjusted instead of using
                only a fixed 28-day cycle.
              </p>
            </div>

            <div className="guide-visual">
              <div className="guide-image">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80"
                  alt="guide"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TrackingPage;