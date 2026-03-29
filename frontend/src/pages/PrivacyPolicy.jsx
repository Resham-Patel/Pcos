import React from "react";
import "../styles/legalPages.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-badge">FemWell Policy</div>
        <h1>Privacy Policy</h1>
        <p className="legal-intro">
          Your privacy matters to us. This page explains what information FemWell
          collects, how it is used, and how we work to protect your data.
        </p>

        <section className="legal-section">
          <h2>1. Information We Collect</h2>
          <p>
            FemWell may collect personal details such as your name, email
            address, and health-related information that you voluntarily provide,
            including cycle details, symptoms, and wellness inputs.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Why We Collect It</h2>
          <p>
            We collect this information to provide features such as personalized
            tracking, symptom insights, predictions, and wellness
            recommendations.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. How Your Data Is Used</h2>
          <p>
            Your data is used only to improve your experience inside FemWell. We
            do not use your information for unrelated purposes, and we do not
            sell your personal data to third parties.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Data Protection</h2>
          <p>
            We aim to store user information securely and take reasonable steps
            to protect it from unauthorized access, misuse, or disclosure.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Sharing of Information</h2>
          <p>
            FemWell does not publicly share your personal health information. Any
            sharing, if ever needed, would only be limited to essential service
            operation and legal requirements.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;