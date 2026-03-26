import React from 'react';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
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
          {/* Using a placeholder div instead of an <img> tag */}
          <div className="image-placeholder">
             <span>Hero Image Placeholder</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;