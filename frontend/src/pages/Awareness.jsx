import React from 'react';
import '../styles/awareness.css';
import { Link } from "react-router-dom";
const Awareness = () => {
  return (
    <div className="awareness-page-wrapper">
      {/* Header Section */}
      <header className="awareness-header">
        <div className="user-welcome">
          <h1>Awareness Hub</h1>
        </div>
      </header>

      {/* Awareness Content Section */}
      <section className="awareness-section">
        <div className="awareness-featured-card">
          <div className="awareness-badge">ESSENTIAL</div>
          <div className="featured-content">
            <h3>What is PCOS?<br />A Comprehensive Guide</h3>
          </div>
        </div>

        {/* Grid Cards */}
        <Link to="/symptoms-awareness" className="awareness-card-link">
          <div className="awareness-grid-card soft-pink">
            <div className="card-icon-small">📖</div>
            <h4>Understanding Symptoms</h4>
            <p>Identifying the subtle signs your body is giving you.</p>
          </div>
        </Link>

        <Link to="/hormone-balance-awareness" className="awareness-card-link">
          <div className="awareness-grid-card soft-blue">
            <div className="card-icon-small">🥗</div>
            <h4>Hormone Balance</h4>
            <p>Nutrition tips for cycle regulation.</p>
          </div>
        </Link>

        <Link to="/exercise-guide-awareness" className="awareness-card-link">
          <div className="awareness-grid-card soft-green">
            <div className="card-icon-small">🤸</div>
            <h4>Exercise Guide</h4>
            <p>Low-impact routines for hormonal health.</p>
          </div>
        </Link>

        <div className="awareness-stat-card">
          <div className="stat-number">1 in 10</div>
          <p>
            Women of childbearing age have PCOS. You are not alone on this
            journey.
          </p>
        </div>
      </section >

      {/* Daily Insights Section */}
      <section section className="insights-section" >
        <h3>Daily Insights</h3>

        <div className="insights-grid">
          <Link to="/myth-vs-fact-awareness" className="awareness-card-link">
            <div className="insight-row">
              <div className="insight-icon myth-bg">💡</div>
              <div className="insight-text">
                <h4>Myth vs. Fact</h4>
                <p>PCOS isn't just about fertility.</p>
              </div>
              <span className="arrow-right">›</span>
            </div>
          </Link>
        </div>
      </section >
    </div >
  );
};

export default Awareness;