import React from 'react';
import '../styles/home.css'; 

const Footer = () => {
  return (
    <footer className="footer-minimal">
      <div className="footer-content">
        <div className="footer-brand-minimal">
          <img src="/logo.png" alt="FemWell Logo" className="logo-img" />
          <span className="logo-text">
            Fem<span>Well</span>
          </span>
        </div>
        
        <div className="footer-copyright-minimal">
          <p>&copy; 2026 FemWell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;