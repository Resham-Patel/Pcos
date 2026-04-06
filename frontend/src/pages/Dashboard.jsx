import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartPulse,
  ClipboardList,
  MessageCircle,
  User,
  Mail,
  LogOut,
} from "lucide-react";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const fullName = storedUser.name || "User";
  const email = storedUser.email || "No email available";
  const firstLetter = fullName.charAt(0).toUpperCase();

  const cards = [
    {
      title: "PCOS Prediction",
      desc: "Check your risk based on symptoms",
      icon: <HeartPulse size={20} />,
      path: "/predict",
    },
    {
      title: "Recommendations",
      desc: "Diet, exercise & lifestyle guidance",
      icon: <ClipboardList size={20} />,
      path: "/recommendations",
    },
    {
      title: "AI Chat Support",
      desc: "Talk to your PCOS care assistant",
      icon: <MessageCircle size={20} />,
      path: "/chatbot",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-topbar">
          <div className="dashboard-heading">
            <h1>Welcome back, {fullName}</h1><br></br>
            <p>Track your health and stay in balance</p>
          </div>

          <div className="profile-pill">
            <div className="avatar-circle">{firstLetter}</div>
          </div>
        </div>

        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <div
              className="dashboard-card clickable-card"
              onClick={() => navigate(card.path)}
            >
              <div className="card-icon-box">{card.icon}</div>

              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="info-section">
          <h2>Personal Info</h2>

          <div className="info-box">
            <div className="info-icon pink-icon">
              <User size={18} />
            </div>
            <p className="info-label">Full Name</p>
            <h3>{fullName}</h3>
          </div>

          <div className="info-box">
            <div className="info-icon purple-icon">
              <Mail size={18} />
            </div>
            <p className="info-label">Email Address</p>
            <h3>{email}</h3>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;