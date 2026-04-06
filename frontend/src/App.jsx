import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Chatbot from "./pages/chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
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
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";


function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  return (
    <div className="app-container">
      {!isAuthPage && <Navbar />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/symptoms-awareness" element={<SymptomPageAwareness />} />
          <Route path="/hormone-balance-awareness" element={<HormoneBalanceAwareness />} />
          <Route path="/myth-vs-fact-awareness" element={<MythVsFactAwareness />} />
          <Route path="/exercise-guide-awareness" element={<ExerciseGuideAwareness />} />
          <Route path="/dashboard" element={<Dashboard />}/>

          <Route
            path="/predict"
            element={
              <ProtectedRoute>
                <Predict />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <Recommendation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tracking"
            element={
              <ProtectedRoute>
                <Tracking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;