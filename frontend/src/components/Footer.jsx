import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src="/logo.png" alt="FemWell Logo" className="footer-logo" />
              <h2 className="footer-title">
                Fem<span>Well</span>
              </h2>
            </div>
            <p className="footer-tagline">
              Supporting women’s health with smart PCOS prediction, tracking and guidance.
            </p>
          </div>

          <div className="footer-links-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/contact-support">Contact Support</Link>
              <Link to="/medical-disclaimer">Medical Disclaimer</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 FemWell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;