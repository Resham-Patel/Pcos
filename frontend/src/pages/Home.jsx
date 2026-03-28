import React from 'react';
import '../styles/home.css';
const Home = () => {
  const features = [
    {
      title: "PCOS Prediction",
      desc: "Early detection patterns using AI models trained on clinical datasets to help you understand your risk profile.",
      icon: "📈",
      linkText: "Learn more",
      theme: "blue-gradient"
    },
    {
      title: "Personalized Care",
      desc: "Dynamic meal plans, exercise routines, and sleep optimization strategies tailored to your hormonal cycle.",
      icon: "🧘‍♀️",
      linkText: "Explore Plans",
      theme: "purple-gradient"
    },
    {
      title: "AI Chatbot Support",
      desc: "24/7 empathetic conversational AI to answer your questions and provide emotional support on your journey.",
      icon: "✨",
      linkText: "Chat Now",
      theme: "teal-gradient"
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
            <button className="btn-primary">Start Your Journey</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="image-placeholder">
            <img src="/home_page.png" alt="FemWell Avatar" className="hero-image" />
          </div>
        </div>
      </section>

      {/* 2. Key Features Section */}
      <section className="features-wrapper">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          {features.map((f, index) => (
            <div key={index} className={`feature-card ${f.theme}`}>
              <div className="feature-icon-box">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <button className="feature-nav-btn">
                {f.linkText} <span className="arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Understanding PCOS Section (Bento Grid) */}
      <section className="pcos-education-wrapper">
        <div className="section-header-left">
          <h2 className="pcos-title">Understanding PCOS</h2>
          <p className="pcos-subtitle">
            Knowledge is empowerment. Explore the facets of PCOS through our expert-curated educational modules.
          </p>
        </div>

        <div className="pcos-bento-grid">
          <div className="pcos-card main-path-card">
            <div className="path-text">
              <h3>The Hormonal Symphony</h3>
              <p>Dive deep into how insulin resistance and androgen levels interact within your body’s ecosystem.</p>
              <a href="#" className="path-link">Explore Educational Path <span className="arrow">→</span></a>
            </div>
            <div className="path-visual"></div>
          </div>

          <div className="pcos-card insight-highlight">
            <div className="insight-icon">💡</div>
            <h4>Daily Insight</h4>
            <p>Magnesium intake can significantly improve insulin sensitivity for some.</p>
          </div>

          <div className="pcos-card utility-card">
            <div className="util-icon-box pink-bg">🌷</div>
            <h4>Cycle Mapping</h4>
            <p>Visualizing the patterns that standard apps often miss.</p>
          </div>

          <div className="pcos-card utility-card">
            <div className="util-icon-box grey-bg">🍏</div>
            <h4>Nutrition Guides</h4>
            <p>Anti-inflammatory recipes designed for hormonal health.</p>
          </div>

          <div className="pcos-card community-stack-card">
            <h4>Community Support</h4>
            <p>Connect with others navigating the same journey.</p>
            <div className="avatar-group">
              <div className="avatar-circle"></div>
              <div className="avatar-circle"></div>
              <div className="avatar-circle"></div>
              <span className="join-count">+12k</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final Minimalist Footer */}
      
    </div>
  );
};

export default Home;