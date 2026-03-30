import React, { useMemo, useState } from "react";
import "../styles/tracking.css";

const TrackingPage = () => {
  // Example cycle data
  const cycleLength = 28;
  const periodLength = 5;

  // Example last period start date
  const lastPeriodStart = new Date(2026, 2, 6); // March 6, 2026

  const [currentMonth, setCurrentMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const today = new Date();

  const monthLabel = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Monday-first calendar
    let startWeekday = firstDayOfMonth.getDay(); // Sunday=0
    startWeekday = startWeekday === 0 ? 6 : startWeekday - 1; // Monday=0

    const daysInMonth = lastDayOfMonth.getDate();

    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month filler
    for (let i = startWeekday - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        day: prevMonthLastDay - i,
        muted: true,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        day,
        muted: false,
      });
    }

    // Next month filler to complete grid
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
    const diff = dayDiff(lastPeriodStart, date);
    if (diff < 0) return null;
    return diff % cycleLength;
  };

  const isPeriodDay = (date) => {
    const cycleDay = getCycleDay(date);
    return cycleDay !== null && cycleDay >= 0 && cycleDay < periodLength;
  };

  const nextPeriodStart = useMemo(() => {
    const diff = dayDiff(lastPeriodStart, today);
    const cyclesPassed = Math.floor(Math.max(diff, 0) / cycleLength);
    let next = new Date(lastPeriodStart);
    next.setDate(lastPeriodStart.getDate() + (cyclesPassed + 1) * cycleLength);

    if (isSameDate(next, today) || next < today) {
      next.setDate(next.getDate() + cycleLength);
    }

    return next;
  }, [today]);

  const daysUntilNextPeriod = Math.max(dayDiff(today, nextPeriodStart), 0);

  const cyclePhase = useMemo(() => {
    const cycleDay = getCycleDay(today);
    if (cycleDay === null) return "Follicular Phase";
    if (cycleDay < periodLength) return "Menstrual Phase";
    if (cycleDay < 13) return "Follicular Phase";
    if (cycleDay < 16) return "Ovulation Phase";
    return "Luteal Phase";
  }, [today]);

  const formattedNextPeriod = nextPeriodStart.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

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

  return (
    <div className="tracking-page">
      <div className="tracking-container">
        <section className="hero-text">
          <h1>Cycle Tracking</h1><br></br>
          <p>
            Your cycle is in the <span>{cyclePhase}</span>. You might feel a
            boost in energy today.
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

                  return (
                    <div
                      key={index}
                      className={`calendar-day 
                        ${item.muted ? "muted" : ""}
                        ${isPeriod ? "light-pink" : ""}
                        ${isToday ? "active" : ""}
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
              <h2>{daysUntilNextPeriod} Days</h2>
              <p className="sub-label">Predicted: {formattedNextPeriod}</p>
              <button className="primary-btn">Log Symptoms</button>
            </div>
          </div>
        </section>

        <section className="metrics-section">
          <div className="section-header">
            <h2>Health Metrics</h2>
            <span>View Insights</span>
          </div>

          <div className="metrics">
            <div className="metric-card">
              <div className="metric-top">
                <div className="metric-icon">⚖️</div>
                <span className="green-badge">-0.8 kg</span>
              </div>
              <p className="metric-title">Weight</p>
              <h3>64.2 kg</h3>
              <div className="bar-chart">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span className="dark"></span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <div className="metric-icon">✳</div>
                <span className="pink-badge">High</span>
              </div>
              <p className="metric-title">Inflammation</p>
              <h3>Level 7</h3>
              <div className="progress-line">
                <div className="progress-fill"></div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-top">
                <div className="metric-icon">☾</div>
                <span className="gray-badge">Normal</span>
              </div>
              <p className="metric-title">Sleep Score</p>
              <h3>84/100</h3>
              <div className="trend">
                <span className="trend-dot"></span>
                <span>Improving trend</span>
              </div>
            </div>
          </div>
        </section>

        <section className="symptoms-section">
          <div className="section-header">
            <h2>Recent Symptoms</h2>
          </div>

          <div className="symptoms-row">
            <div className="symptom-pill">
              <div className="symptom-icon pink-lite">Ac</div>
              <div>
                <h4>Mild Acne</h4>
                <p>Logged 2h ago</p>
              </div>
            </div>

            <div className="symptom-pill">
              <div className="symptom-icon purple-lite">Fa</div>
              <div>
                <h4>Fatigue</h4>
                <p>Logged 6h ago</p>
              </div>
            </div>
          </div>
        </section>

        <section className="guide-card">
          <div className="guide-content">
            <div className="guide-text">
              <h2>Personalized PCOS Guide</h2>
              <p>
                Based on your current cycle phase and recent fatigue levels, we
                recommend a high-protein breakfast and 20 mins of light movement
                today.
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