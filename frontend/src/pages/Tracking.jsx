import React from "react";
import "../styles/tracking.css";

const TrackingPage = () => {
  const days = [
    { day: "26", muted: true },
    { day: "27", muted: true },
    { day: "28", muted: true },
    { day: "29", muted: true },
    { day: "1" },
    { day: "2" },
    { day: "3" },
    { day: "4" },
    { day: "5" },
    { day: "6", lightPink: true },
    { day: "7", lightPink: true },
    { day: "8", lightPink: true },
    { day: "9", lightPink: true },
    { day: "10", lightPink: true },
    { day: "11" },
    { day: "12", active: true },
    { day: "13" },
    { day: "14" },
    { day: "15" },
    { day: "16" },
    { day: "17" },
  ];

  return (
    <div className="tracking-page">
      <div className="mobile-frame">
        {/* Header */}
        <div className="topbar">
          <div className="top-icons">
            <img
              className="profile-img"

              alt="profile"
            />
          </div>
        </div>

        {/* Greeting */}
        <div className="hero-text">
          <h1>Hello, Sarah</h1>
          <p>
            Your cycle is in the <span>Follicular Phase.</span> You might feel a
            boost in energy today.
          </p>
        </div>

        {/* Calendar Card */}
        <div className="card calendar-card">
          <div className="card-header">
            <div>
              <h2>Cycle Tracking</h2>
              <p>March 2024</p>
            </div>
            <div className="calendar-arrows">
              <button>‹</button>
              <button>›</button>
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
            {days.map((item, index) => (
              <div
                key={index}
                className={`calendar-day 
                  ${item.muted ? "muted" : ""} 
                  ${item.lightPink ? "light-pink" : ""}
                  ${item.active ? "active" : ""}`}
              >
                {item.day}
              </div>
            ))}
          </div>
        </div>

        {/* Next Period */}
        <div className="card next-period-card">
          <div className="small-icon">🩸</div>
          <p className="label">Next Period</p>
          <h2>14 Days</h2>
          <p className="sub-label">Predicted: March 26</p>
          <button className="primary-btn">Log Symptoms</button>
        </div>

        {/* Health Metrics */}
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

        {/* Symptoms */}
        <div className="section-header symptoms-header">
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

        {/* Personalized Guide */}
        <div className="guide-card">
          <div className="guide-content">
            <div className="guide-text">
              <h2>Personalized PCOS Guide</h2>
              <p>
                Based on your follicular phase and recent fatigue levels, we recommend a
                high-protein breakfast and 20 mins of light movement today.
              </p>
            </div>

            <div className="guide-actions">
              <button className="white-btn">Read Daily Tips</button>

              <div className="guide-image">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80"
                  alt="guide"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;