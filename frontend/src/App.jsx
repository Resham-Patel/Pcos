import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup"; 
import Login from "./pages/Login"; // 1. Ensure Login is imported
import Recommendation from "./pages/Recommendation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Awareness from "./pages/Awareness";
import Tracking from "./pages/Tracking";
import SymptomPageAwareness from "./pages/SymptomPage_Awareness";

function App() {
  const location = useLocation();

  // 2. Updated Logic: Check if the current path is EITHER signup or login
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";

  return (
    <div className="app-container">
      {/* 3. Navbar is hidden on all Auth pages */}
      {!isAuthPage && <Navbar />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/recommendations" element={<Recommendation />} />
          <Route path="/symptoms-awareness" element={<SymptomPageAwareness />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* 4. Footer is hidden on all Auth pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;