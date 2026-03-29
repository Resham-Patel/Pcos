import React from "react";
import "../styles/mythVsFact_awareness.css";

const MythVsFactAwareness = () => {
  return (
    <div className="myth-page">
      {/* HERO */}
      <section className="myth-hero">
        <div className="myth-hero-badge">AWARENESS GUIDE</div>
        <h1>Myth vs Fact</h1>
        <p>
          There are many misconceptions around PCOS. Learning the difference
          between myths and facts can help you make more informed and confident
          choices.
        </p>
      </section>

      {/* INTRO */}
      <section className="myth-section">
        <div className="section-heading">
          <h2>Why myths matter</h2>
          <p>
            Misinformation can create fear, confusion, and unrealistic
            expectations. Reliable awareness helps users understand PCOS with
            more clarity and less anxiety.
          </p>
        </div>
      </section>

      {/* MYTH FACT CARDS */}
      <section className="myth-section">
        <div className="section-heading">
          <h2>Common myths and facts</h2>
          <p>
            These are some of the most common things people hear about PCOS —
            and what is actually true.
          </p>
        </div>

        <div className="myth-grid">
          <div className="myth-card">
            <div className="myth-label">MYTH</div>
            <h3>PCOS is only about fertility problems.</h3>
            <p>
              Many people assume PCOS only matters if someone wants to get
              pregnant.
            </p>

            <div className="fact-box">
              <div className="fact-label">FACT</div>
              <p>
                PCOS can also affect hormones, skin, weight, metabolism, mood,
                and menstrual health — not just fertility.
              </p>
            </div>
          </div>

          <div className="myth-card">
            <div className="myth-label">MYTH</div>
            <h3>You must have ovarian cysts to have PCOS.</h3>
            <p>
              The name can make people think cysts are always required for the
              condition.
            </p>

            <div className="fact-box">
              <div className="fact-label">FACT</div>
              <p>
                Not everyone with PCOS has ovarian cysts, and diagnosis usually
                considers multiple factors, not just one feature.
              </p>
            </div>
          </div>

          <div className="myth-card">
            <div className="myth-label">MYTH</div>
            <h3>People with PCOS can never lose weight.</h3>
            <p>
              This myth can make people feel discouraged and hopeless.
            </p>

            <div className="fact-box">
              <div className="fact-label">FACT</div>
              <p>
                Weight changes may be more challenging for some people with
                PCOS, but supportive routines and consistency can still make a
                difference.
              </p>
            </div>
          </div>

          <div className="myth-card">
            <div className="myth-label">MYTH</div>
            <h3>Irregular periods are normal and should always be ignored.</h3>
            <p>
              Some people think delayed or unpredictable cycles are nothing to
              pay attention to.
            </p>

            <div className="fact-box">
              <div className="fact-label">FACT</div>
              <p>
                Irregular periods can be an important sign that hormone balance
                may need attention, especially when combined with other
                symptoms.
              </p>
            </div>
          </div>

          <div className="myth-card">
            <div className="myth-label">MYTH</div>
            <h3>PCOS looks the same for everyone.</h3>
            <p>
              This can lead people to compare their experience too much with
              others.
            </p>

            <div className="fact-box">
              <div className="fact-label">FACT</div>
              <p>
                PCOS can show up differently from person to person. Symptoms,
                severity, and patterns are not always the same.
              </p>
            </div>
          </div>

          <div className="myth-card">
            <div className="myth-label">MYTH</div>
            <h3>If symptoms are mild, it cannot be PCOS.</h3>
            <p>
              Mild signs are often overlooked because they do not feel serious
              enough.
            </p>

            <div className="fact-box">
              <div className="fact-label">FACT</div>
              <p>
                PCOS symptoms can range from mild to more noticeable. Even early
                or subtle signs may still deserve attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK REMEMBER */}
      <section className="myth-section">
        <div className="section-heading">
          <h2>What to remember</h2>
          <p>
            Good awareness starts with asking questions and looking for trusted
            guidance rather than relying on common assumptions.
          </p>
        </div>

        <div className="remember-list">
          <div className="remember-card">
            <div className="remember-icon">💡</div>
            <p>PCOS is a broad hormonal condition, not just one symptom.</p>
          </div>

          <div className="remember-card">
            <div className="remember-icon">🩺</div>
            <p>Symptoms may appear differently in different people.</p>
          </div>

          <div className="remember-card">
            <div className="remember-icon">🌸</div>
            <p>Awareness helps you notice patterns earlier and respond better.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="myth-cta">
        <div className="myth-cta-content">
          <div className="myth-cta-badge">NEXT STEP</div>
          <h2>Want deeper, more personalized support?</h2>
          <p>
            Log in to explore prediction, recommendations, and tracking features
            designed to support your PCOS wellness journey.
          </p>
          <button className="myth-primary-btn">
            Explore More (Login Required)
          </button>
        </div>
      </section>
    </div>
  );
};

export default MythVsFactAwareness;