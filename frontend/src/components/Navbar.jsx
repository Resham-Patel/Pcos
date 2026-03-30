import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" className="logo-container">
          <img src="/logo.png" alt="FemWell Logo" className="logo-img" />
          <span className="logo-text">Fem<span>Well</span></span>
        </Link>
      </div>

      <ul className="nav-links">
        {/* NavLink automatically manages the 'active' class for styling */}
        <li><NavLink to="/awareness">Awareness</NavLink></li>
        <li><NavLink to="/predict">Prediction</NavLink></li>
        <li><NavLink to="/tracking">Tracking</NavLink></li>
        <li><NavLink to="/chatbot">AI Chat</NavLink></li>
      </ul>

      <div className="nav-actions">
        {/* Login Button - Navigates to Signup/Login page */}
        <Link to="/login" className="btn-login">
          Login
        </Link>

        {/* Sign Up Button - Primary Action */}
        <Link to="/signup" className="btn-signup">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;