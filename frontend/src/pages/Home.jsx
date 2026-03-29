import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "PCOS Prediction",
      desc: "Identify key indicators and understand your risk profile using clinical-grade AI.",
      icon: "📊",
      btnText: "LEARN MORE",
      link: "/predict",
      colorClass: "blue-glass"
    },
    {
      title: "Personalized Care",
      desc: "Unlock tailored meal plans and fitness regimens that adapt to your cycle.",
      icon: "📅",
      btnText: "VIEW CARE PLANS",
      link: "/recommendations",
      colorClass: "purple-glass"
    },
    {
      title: "AI Chatbot Support",
      desc: "Access immediate, compassionate guidance with 24/7 AI-driven support.",
      icon: "🤖",
      btnText: "TALK TO US NOW",
      link: "/chat",
      colorClass: "green-glass"
    }
  ];

  return (
    <div className="home-container">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge">PCOS Awareness Month</span>
          <h1 className="hero-title">
            Your Personal <span className="highlight">Sanctuary</span> for Hormonal Balance.
          </h1>
          <p className="hero-description">
            FemWell is more than a tracker. It’s an intelligent companion 
            designed to demystify PCOS through clinically-backed awareness 
            and AI-driven insights.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate('/signup')}>Start Your Journey</button>
            <button className="btn-secondary" onClick={() => navigate('/awareness')}>Learn More</button>
          </div>
        </div>

        <div className="hero-image-container">
          <img src="/home_page.png" alt="FemWell Illustration" className="hero-image" />
        </div>
      </section>

      {/* 2. Key Features Section (The Cards from your Image) */}
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

      {/* 3. Understanding PCOS Section (Bento Grid) */}
      <section className="pcos-education-wrapper">
        {/* <div className="section-header-left"> */}
          {/* <h2 className="pcos-title">Understanding PCOS</h2>
          <p className="pcos-subtitle">Knowledge is empowerment. Explore expert-curated modules.</p>
        </div> */}

        {/* <div className="pcos-bento-grid">
          <div className="pcos-card main-path-card">
            <div className="path-text">
              <h3>The Hormonal Symphony</h3>
              <p>Dive deep into insulin resistance and androgen levels.</p>
              <a href="#" className="path-link">Explore Path →</a>
            </div>
          </div>
          <div className="pcos-card insight-highlight">
            <h4>Daily Insight</h4>
            <p>Magnesium improves insulin sensitivity.</p>
          </div>
          <div className="pcos-card community-stack-card">
            <h4>Community</h4>
            <div className="avatar-group">
              <div className="avatar-circle"></div>
              <div className="avatar-circle"></div>
              <span className="join-count">+12k</span>
            </div>
          </div> */}
        {/* </div> */}
      </section>
      <section className="cta-banner-wrapper">
        <div className="cta-card">
          <h2>Ready to reclaim your cycle?</h2>
         
          <div className="cta-form">
            
            <button 
              className="btn-accent" 
              onClick={() => navigate('/signup')}
            >
              Get Early Access
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;