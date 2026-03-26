import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Fem<span>Well</span></Link>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/awareness" className={({ isActive }) => (isActive ? 'active' : '')}>
            Awareness
          </NavLink>
        </li>
        <li>
          <NavLink to="/predict" className={({ isActive }) => (isActive ? 'active' : '')}>
            Prediction
          </NavLink>
        </li>
        <li>
          <NavLink to="/tracking" className={({ isActive }) => (isActive ? 'active' : '')}>
            Tracking
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : '')}>
            AI Chat
          </NavLink>
        </li>
      </ul>

      <div className="nav-actions">
        <Link to="/register" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;