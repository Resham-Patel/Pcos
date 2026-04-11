import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const features = [
    {
      title: "PCOS Prediction",
      desc: "Identify key indicators and understand your risk profile using clinical-grade AI.",
      icon: "📊",
      btnText: "LEARN MORE",
      link: "/predict",
      colorClass: "blue-glass",
    },
    {
      title: "Personalized Care",
      desc: "Unlock tailored meal plans and fitness regimens that adapt to your cycle.",
      icon: "📅",
      btnText: "VIEW CARE PLANS",
      link: "/recommendations",
      colorClass: "purple-glass",
    },
    {
      title: "AI Chatbot Support",
      desc: "Access immediate, compassionate guidance with 24/7 AI-driven support.",
      icon: "🤖",
      btnText: "TALK TO US NOW",
      link: "/chatbot",
      colorClass: "green-glass",
    },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge">PCOS Awareness Month</span>
          <h1 className="hero-title">
            Your Personal <span className="highlight">Wellness Companion</span> for Hormonal Balance.
          </h1>
          <p className="hero-description">
            FemWell is more than a tracker. It’s an intelligent companion
            designed to demystify PCOS through clinically-backed awareness
            and AI-driven insights.
          </p>

          <div className="hero-btns">
            {!isAuthenticated ? (
              <>
                <button className="btn-primary" onClick={() => navigate("/register")}>
                  Start Your Journey
                </button>
                <button className="btn-secondary" onClick={() => navigate("/login")}>
                  Login
                </button>
              </>
            ) : (
              <>
                <button className="btn-primary" onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </button>
                <button className="btn-secondary" onClick={() => navigate("/awareness")}>
                  Learn More
                </button>
              </>
            )}
          </div>
        </div>

        <div className="hero-image-container">
          <img src="/home_page.png" alt="FemWell Illustration" className="hero-image" />
        </div>
      </section>

      <section className="features-wrapper">
        <h2 className="section-title">Precision Tools for Your Health</h2>
        <div className="features-grid">
          {features.map((f, index) => (
            <div key={index} className={`feature-card ${f.colorClass}`}>
              <div className="card-content">
                <div className="icon-wrapper">{f.icon}</div>
                <div className="text-wrapper">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <button className="card-btn" onClick={() => navigate(f.link)}>
                    {f.btnText} <span className="arrow">›</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="cta-banner-wrapper">
        <div className="cta-card">
          <h2>Ready to reclaim your cycle?</h2>
          <div className="cta-form">
            {!isAuthenticated ? (
              <button className="btn-accent" onClick={() => navigate("/register")}>
                Get Early Access
              </button>
            ) : (
              <button className="btn-accent" onClick={() => navigate("/dashboard")}>
                Open Dashboard
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;