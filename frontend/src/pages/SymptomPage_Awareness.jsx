import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/symptomPage_awareness.css";


const SymptomPageAwareness = () => {
    const navigate = useNavigate();
    return (
        <div className="symptoms-page">
            {/* HERO */}
            <section className="symptoms-hero">
                <div className="symptoms-hero-badge">AWARENESS GUIDE</div>
                <h1>Understanding PCOS Symptoms</h1>
                <p>
                    Learn how your body may signal hormonal imbalance, why symptoms appear,
                    and when it may be helpful to seek more personalized support.
                </p>
            </section>

            {/* SYMPTOMS GRID */}
            <section className="symptoms-section">
                <div className="section-heading">
                    <h2>Common Symptoms</h2>
                    <p>
                        PCOS can affect periods, skin, weight, mood, and hair growth in
                        different ways for different people.
                    </p>
                </div>

                <div className="symptoms-grid">
                    <div className="symptom-card soft-pink">
                        <div className="symptom-icon">🌸</div>
                        <h3>Irregular Periods</h3>
                        <p>
                            Menstrual cycles may become delayed, skipped, or difficult to
                            predict due to hormonal disruption.
                        </p>
                    </div>

                    <div className="symptom-card soft-blue">
                        <div className="symptom-icon">😣</div>
                        <h3>Acne</h3>
                        <p>
                            Persistent breakouts can happen when androgen levels affect oil
                            production in the skin.
                        </p>
                    </div>

                    <div className="symptom-card soft-purple">
                        <div className="symptom-icon">⚖️</div>
                        <h3>Weight Changes</h3>
                        <p>
                            Some people may notice weight gain, especially around the abdomen,
                            often linked with insulin resistance.
                        </p>
                    </div>

                    <div className="symptom-card soft-green">
                        <div className="symptom-icon">🧬</div>
                        <h3>Excess Hair Growth</h3>
                        <p>
                            Extra facial or body hair may appear because of higher androgen
                            activity in the body.
                        </p>
                    </div>

                    <div className="symptom-card soft-peach">
                        <div className="symptom-icon">💇‍♀️</div>
                        <h3>Hair Thinning</h3>
                        <p>
                            Some people experience scalp hair loss or thinning, especially
                            near the front or crown.
                        </p>
                    </div>

                    <div className="symptom-card soft-lilac">
                        <div className="symptom-icon">😴</div>
                        <h3>Fatigue & Mood Changes</h3>
                        <p>
                            Energy levels, stress, and emotional well-being can also be
                            affected alongside physical symptoms.
                        </p>
                    </div>
                </div>
            </section>

            {/* CAUSES */}
            <section className="symptoms-section">
                <div className="section-heading">
                    <h2>Why do these symptoms happen?</h2>
                    <p>
                        PCOS symptoms are often connected to hormone shifts, insulin
                        resistance, and genetic factors.
                    </p>
                </div>

                <div className="causes-grid">
                    <div className="cause-card">
                        <h4>Hormonal Imbalance</h4>
                        <p>
                            Increased androgen levels can affect ovulation, skin health, and
                            hair growth patterns.
                        </p>
                    </div>

                    <div className="cause-card">
                        <h4>Insulin Resistance</h4>
                        <p>
                            The body may struggle to use insulin efficiently, which can
                            influence energy, weight, and hormone balance.
                        </p>
                    </div>

                    <div className="cause-card">
                        <h4>Genetics</h4>
                        <p>
                            PCOS can run in families, which means inherited factors may also
                            play a role.
                        </p>
                    </div>
                </div>
            </section>


            {/* CTA */}
            <section className="symptoms-cta">
                <div className="symptoms-cta-content">
                    <div className="symptoms-cta-badge">NEXT STEP</div>
                    <h2>Not sure what your symptoms may mean?</h2>
                    <p>
                        Explore a more personalized prediction experience after login and
                        get guidance tailored to your symptom pattern.
                    </p>
                    <button
                        className="symptoms-primary-btn"
                        onClick={() => navigate("/login")}
                    >
                        Predict Now (Login Required)
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SymptomPageAwareness;