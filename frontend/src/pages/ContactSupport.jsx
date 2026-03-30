import React from "react";
import "../styles/legalPages.css";

const ContactSupport = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-badge">FemWell Support</div>
        <h1>Contact Support</h1>
        <p className="legal-intro">
          Need help with your account, tracking, or general questions? We are
          here to support you.
        </p>

        <section className="legal-section support-card">
          <h2>Email Support</h2>
          <p>
            For help, feedback, or account-related concerns, reach out to us at:
          </p>
          <p className="support-highlight">support@femwell.com</p>
        </section>

        <section className="legal-section">
          <h2>We can help with</h2>
          <ul className="legal-list">
            <li>Account access issues</li>
            <li>Login or signup problems</li>
            <li>Questions about tracking or recommendations</li>
            <li>Feedback, bugs, or suggestions</li>
            <li>Data privacy concerns</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Before Contacting Support</h2>
          <p>
            Please include a short description of your issue so we can help you
            faster. If it is an account issue, mention the email address linked
            to your FemWell account.
          </p>
        </section>

        <p className="legal-footer-note">
          Thank you for using FemWell. Your feedback helps us improve.
        </p>
      </div>
    </div>
  );
};

export default ContactSupport;