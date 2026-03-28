import React from 'react';
import '../styles/signup.css';

const Signup = () => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        {/* Left Side: Visual/Branding Section */}
        <div className="auth-visual">
          <div className="visual-overlay"></div>
          <div className="visual-content">
            <h2 className="brand-name">FemWell</h2>
            <div className="hero-text-group">
            
              <h1>Your journey to hormonal harmony starts here.</h1>
              <div className="quote-block">
                <p>“Healing is not a destination, it’s the grace you give yourself every single day.”</p>
              </div>
            </div>
            
            
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="auth-form-side">
          <div className="form-container">
            <h2>Welcome!</h2>
            <p className="subtitle">Access your personalized wellness tracking and AI guidance.</p>

            <form className="login-form">
                <div className="input-field">
                <label>Name</label>
                <input type="email" placeholder="Sarah Doe" />
              </div>
              <div className="input-field">
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" />
              </div>

              <div className="input-field">
                <div className="label-row">
                  <label>Password</label>

                </div>
                <div className="password-input-wrapper">
                  <input type="password" placeholder="password" />
        
                </div>
              </div>

              

              <button type="submit" className="btn-enter">
                Get Started
              </button>
            </form>

            <p className="switch-auth">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
      
      {/* External Footer Links */}
      <footer className="auth-footer">
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Medical Disclaimer</a>
          <a href="#">Contact Support</a>
        </div>
        <p>© 2026 FemWell Digital. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;