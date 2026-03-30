import React, { useEffect, useState } from "react";
import { getRecommendation } from "../services/api";
import "../styles/recommendation.css";

const Recommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRecommendation = async () => {
      try {
        const savedData = localStorage.getItem("recommendationData");

        if (!savedData) {
          console.error("No recommendation data found");
          setLoading(false);
          return;
        }

        const parsedData = JSON.parse(savedData);
        const response = await getRecommendation(parsedData);

        setRecommendation(response.data);
      } catch (error) {
        console.error("Error fetching recommendation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, []);

  const aiText =
    recommendation?.ai_generated &&
      recommendation.ai_generated !== "AI recommendation not available (API key missing)"
      ? recommendation.ai_generated
      : "Based on your symptoms and prediction result, focus on consistent lifestyle support, menstrual health monitoring, regular movement, and a balanced diet to improve hormonal wellness.";

  if (loading) {
    return (
      <section className="rec-page">
        <div className="rec-container">
          <div className="loading-box">Loading recommendation...</div>
        </div>
      </section>
    );
  }

  if (!recommendation) {
    return (
      <section className="rec-page">
        <div className="rec-container">
          <div className="loading-box">No recommendation available.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="rec-page">
      <div className="rec-bg-orb rec-bg-orb-one"></div>
      <div className="rec-bg-orb rec-bg-orb-two"></div>

      <div className="rec-container">
        <header className="rec-header">
          <div className="top-meta">
            <span className="badge-pill">AI PERSONALIZED PLAN</span>
            <span className="date-stamp">March 2026</span>
          </div>

          <h1>
            Your Wellness <span className="pink-text">Blueprint</span>
          </h1>

          <p className="rec-subtitle">
            Your plan is generated from your prediction result and symptom
            profile to help guide healthier daily choices.
          </p>
        </header>

        <div className="section-head">
          <div>
            <h3>Personalized AI Guidance</h3>
            <p>AI-generated suggestions tailored to your prediction and symptoms.</p>
          </div>
        </div>

        <div className="ai-grid">
          <article className="ai-card">
            <div className="ai-card-icon">🥗</div>
            <h4>Diet</h4>
            <p>{recommendation.ai_generated?.diet}</p>
          </article>

          <article className="ai-card">
            <div className="ai-card-icon">🏃</div>
            <h4>Exercise</h4>
            <p>{recommendation.ai_generated?.exercise}</p>
          </article>

          <article className="ai-card">
            <div className="ai-card-icon">🌿</div>
            <h4>Lifestyle</h4>
            <p>{recommendation.ai_generated?.lifestyle}</p>
          </article>
        </div>

        <div className="section-head">
          <div>
            <h3>Actionable Tips</h3>
            <p>
              These suggestions are based on your inputs and prediction outcome.
            </p>
          </div>
        </div>

        <div className="rec-grid">
          {recommendation.rule_based && recommendation.rule_based.length > 0 ? (
            recommendation.rule_based.map((item, index) => (
              <article
                key={index}
                className={index === 0 ? "rec-card featured" : "rec-card"}
              >
                {index === 0 && <div className="card-tag">PRIORITY</div>}
                <div className="card-icon">✨</div>
                <h4>Recommendation {index + 1}</h4>
                <p>{item}</p>
              </article>
            ))
          ) : (
            <article className="rec-card featured">
              <div className="card-icon">💡</div>
              <h4>General Advice</h4>
              <p>No rule-based tips were generated for this input.</p>
            </article>
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
          Consult a gynecologist or endocrinologist before making major
          lifestyle changes.
        </p>
      </div>
    </section>
  );
};

export default Recommendation;