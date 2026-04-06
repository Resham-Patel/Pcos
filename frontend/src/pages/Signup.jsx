import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";
import { registerUser } from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);

      console.log(res.data);

      // ✅ SAVE USER DATA HERE
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: form.name,
          email: form.email,
        })
      );

      alert("Signup successful!");

      // redirect to login
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };


  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">

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

        <div className="auth-form-side">
          <div className="form-container">
            <h2>Create Account</h2>

            <form className="login-form" onSubmit={handleSubmit}>

              <div className="input-field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Sarah Doe"
                  onChange={handleChange}
                />
              </div>

              <div className="input-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                />
              </div>

              <div className="input-field">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn-enter">
                Get Started
              </button>
            </form>

            <p className="switch-auth">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="auth-footer">
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/medical-disclaimer">Medical Disclaimer</Link>
          <Link to="/contact-support">Contact Support</Link>
        </div>
        <p>© 2026 FemWell Digital. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;