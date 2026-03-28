import React, { useState, useEffect } from "react";
import "../styles/recommendation.css";

const Recommendation = () => {
  const [activeTab, setActiveTab] = useState("diet");

  // Force scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="rec-container">
      {/* Background Decorative Elements */}
      <div className="bg-glow-pink"></div>

      <header className="rec-header">
        <div className="top-meta">
          <span className="badge-pill">AI PERSONALIZED PLAN</span>
          <span className="date-stamp">March 2026</span>
        </div>
        <h1>
          Your Wellness <span className="pink-text">Blueprint</span>
        </h1>
        <p>
          Small, consistent changes lead to significant hormonal harmony. Here
          is your roadmap.
        </p>
      </header>

      {/* Quick Stats bar */}
      <div className="quick-stats-bar">
        <div className="stat-item">
          <span>Status:</span> 🟢 Optimizing
        </div>
        <div className="stat-item">
          <span>Focus:</span> Insulin Sensitivity
        </div>
        <div className="stat-item">
          <span>Duration:</span> 12 Week Cycle
        </div>
      </div>

      <div className="rec-tabs">
        <button
          className={activeTab === "diet" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("diet")}
        >
          <span className="tab-icon">🍎</span> Nutrition
        </button>
        <button
          className={activeTab === "lifestyle" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("lifestyle")}
        >
          <span className="tab-icon">✨</span> Lifestyle
        </button>
      </div>

      <div className="rec-content-area">
        {activeTab === "diet" ? (
          <div className="rec-grid">
            <div className="rec-card featured">
              <div className="card-tag">PRIORITY</div>
              <div className="card-icon">🥗</div>
              <h4>Anti-Inflammatory Diet</h4>
              <p>
                Incorporate berries, fatty fish, and leafy greens to reduce
                systemic inflammation often associated with PCOS.
              </p>
              <ul className="card-tips">
                <li>Swap white rice for Quinoa</li>
                <li>Add Cinnamon to morning oats</li>
              </ul>
            </div>

            <div className="rec-card">
              <div className="card-icon">🍵</div>
              <h4>Hydration Strategy</h4>
              <p>
                Spearmint tea twice daily has been shown to help lower androgen
                levels and reduce unwanted hair growth.
              </p>
            </div>

            <div className="rec-card">
              <div className="card-icon">🥜</div>
              <h4>Healthy Fats</h4>
              <p>
                Prioritize Omega-3s from walnuts and flaxseeds to support
                regular ovulation cycles.
              </p>
            </div>
          </div>
        ) : (
          <div className="rec-grid">
            <div className="rec-card featured">
              <div className="card-tag">DAILY</div>
              <div className="card-icon">🧘</div>
              <h4>Low-Impact Movement</h4>
              <p>
                Heavy cardio can sometimes spike cortisol. Focus on Yoga,
                Pilates, or brisk walking to stay active without stress.
              </p>
            </div>

            <div className="rec-card">
              <div className="card-icon">😴</div>
              <h4>Sleep Hygiene</h4>
              <p>
                Aim for 8 hours of rest. Hormones like Ghrelin and Leptin
                (hunger hormones) reset during deep sleep.
              </p>
            </div>

            <div className="rec-card">
              <div className="card-icon">☀️</div>
              <h4>Morning Light</h4>
              <p>
                15 mins of sunlight exposure helps regulate your Circadian
                rhythm and Vitamin D levels.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="action-footer">
        <button className="secondary-btn" onClick={() => window.print()}>
          Download Report
        </button>
        <button
          className="primary-btn"
          onClick={() => (window.location.href = "/predict")}
        >
          Retake Assessment
        </button>
      </div>

      <p className="disclaimer-text">
        Disclaimer: This AI-generated plan is for informational purposes only.
        Consult a gynecologist or endocrinologist before making major lifestyle
        changes.
      </p>
    </div>
  );
};

export default Recommendation;
