import React from 'react';
import '../styles/home.css'; // Reusing the established styles

const Footer = () => {
  return (
    <footer className="footer-minimal">
      <div className="footer-content">
        <div className="footer-brand-minimal">
          {/* Ensure the logo is in your public folder */}
          <img src="/logo.png" alt="FemWell Logo" className="logo-img" />
          <span className="logo-text">FemWell</span>
        </div>
        
        <div className="footer-copyright-minimal">
          <p>&copy; 2026 FemWell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;