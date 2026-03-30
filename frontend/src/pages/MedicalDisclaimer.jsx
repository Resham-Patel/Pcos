import React from "react";
import "../styles/legalPages.css";

const MedicalDisclaimer = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-badge">FemWell Notice</div>
        <h1>Medical Disclaimer</h1>
        <p className="legal-intro">
          FemWell is designed to support awareness and wellness guidance. It is
          not a substitute for professional medical advice, diagnosis, or
          treatment.
        </p>

        <section className="legal-section">
          <h2>1. Informational Purpose Only</h2>
          <p>
            All content, recommendations, predictions, and tracking information
            provided by FemWell are for educational and informational purposes
            only.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Not a Medical Diagnosis</h2>
          <p>
            FemWell does not diagnose PCOS or any other medical condition. Any
            prediction or health-related output shown in the app should not be
            treated as a confirmed diagnosis.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Consult a Qualified Professional</h2>
          <p>
            Always seek the advice of a qualified doctor, gynecologist,
            endocrinologist, or healthcare provider before making medical,
            dietary, or lifestyle decisions.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Emergency Situations</h2>
          <p>
            FemWell should not be used in emergency or urgent medical
            situations. If you are experiencing severe symptoms or a health
            emergency, contact a medical professional immediately.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. User Responsibility</h2>
          <p>
            By using FemWell, you acknowledge that you are responsible for how
            you interpret and use the information provided by the platform.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
