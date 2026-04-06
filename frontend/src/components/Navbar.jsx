import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" className="logo-container">
          <img src="/logo.png" alt="FemWell Logo" className="logo-img" />
          <span className="logo-text">
            Fem<span>Well</span>
          </span>
        </Link>
      </div>

      <ul className="nav-links">
        <li><NavLink to="/awareness">Awareness</NavLink></li>

        {isAuthenticated && (
          <>
            <li><NavLink to="/predict">Prediction</NavLink></li>
            <li><NavLink to="/tracking">Tracking</NavLink></li>
            <li><NavLink to="/chatbot">AI Chat</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          </>
        )}
      </ul>

      <div className="nav-actions">
        {isAuthenticated ? (
          <button type="button" className="btn-signup" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-signup">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;