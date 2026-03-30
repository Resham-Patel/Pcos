import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Chatbot from "./pages/chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login"; // 1. Ensure Login is imported
import Recommendation from "./pages/Recommendation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Awareness from "./pages/Awareness";
import Tracking from "./pages/Tracking";
import SymptomPageAwareness from "./pages/SymptomPage_Awareness";
import MythVsFactAwareness from "./pages/mythVsFact_awareness";
import HormoneBalanceAwareness from "./pages/hormoneBalance_awareness";
import ExerciseGuideAwareness from "./pages/exerciseGuide_awareness";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MedicalDisclaimer from "./pages/MedicalDisclaimer";
import ContactSupport from "./pages/ContactSupport";

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
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/recommendations" element={<Recommendation />} />
          <Route path="/symptoms-awareness" element={<SymptomPageAwareness />} />
          <Route path="/hormone-balance-awareness" element={<HormoneBalanceAwareness />} />
          <Route path="/myth-vs-fact-awareness" element={<MythVsFactAwareness />} />
          <Route path="/exercise-guide-awareness" element={<ExerciseGuideAwareness />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
          <Route path="/contact-support" element={<ContactSupport />} />
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