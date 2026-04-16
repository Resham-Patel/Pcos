import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hormoneBalance_awareness.css";

const HormoneBalanceAwareness = () => {
    const navigate = useNavigate();
    return (
        <div className="hormone-page">
            <section className="hormone-hero">
                <div className="hormone-hero-badge">AWARENESS GUIDE</div>
                <h1>Hormone Balance for PCOS</h1>
                <p>
                    Small, consistent lifestyle habits can support hormonal health, energy,
                    and overall well-being. This page gives you a simple starting point.
                </p>
            </section>

            <section className="hormone-section">
                <div className="section-heading">
                    <h2>Core pillars of hormone balance</h2>
                    <p>
                        While every person’s journey is different, these habits often form
                        the foundation of better hormonal support.
                    </p>
                </div>

                <div className="pillars-grid">
                    <div className="pillar-card soft-pink">
                        <div className="pillar-icon">🥗</div>
                        <h3>Nutrition</h3>
                        <p>
                            Balanced meals with protein, fiber, and whole foods may help
                            support blood sugar stability and hormonal health.
                        </p>
                    </div>

                    <div className="pillar-card soft-blue">
                        <div className="pillar-icon">🏃‍♀️</div>
                        <h3>Movement</h3>
                        <p>
                            Regular movement such as walking, yoga, or low-impact exercise can
                            support metabolism, energy, and overall balance.
                        </p>
                    </div>

                    <div className="pillar-card soft-green">
                        <div className="pillar-icon">😴</div>
                        <h3>Sleep</h3>
                        <p>
                            Good sleep helps the body recover and can play an important role
                            in mood, energy, and hormone regulation.
                        </p>
                    </div>

                    <div className="pillar-card soft-lilac">
                        <div className="pillar-icon">🧘</div>
                        <h3>Stress Support</h3>
                        <p>
                            Stress can affect hormones too, so calming practices like
                            stretching, breathing, or mindfulness may be helpful.
                        </p>
                    </div>
                </div>
            </section>

            <section className="hormone-section">
                <div className="section-heading">
                    <h2>Helpful habits vs common challenges</h2>
                    <p>
                        Focusing on simple daily choices can make your routine feel more
                        manageable and sustainable.
                    </p>
                </div>

                <div className="habits-grid">
                    <div className="habit-card do-card">
                        <div className="habit-label do-label">DO MORE OF</div>
                        <ul>
                            <li>Eat balanced meals with protein and fiber</li>
                            <li>Stay active with beginner-friendly movement</li>
                            <li>Keep a more regular sleep schedule</li>
                            <li>Drink enough water during the day</li>
                            <li>Use calming routines to manage stress</li>
                        </ul>
                    </div>

                    <div className="habit-card avoid-card">
                        <div className="habit-label avoid-label">BE MINDFUL OF</div>
                        <ul>
                            <li>Highly processed foods too often</li>
                            <li>Long periods of inactivity</li>
                            <li>Irregular sleep and late-night habits</li>
                            <li>Skipping meals frequently</li>
                            <li>Letting stress build up without support</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="hormone-section">
                <div className="insight-highlight">
                    <div className="insight-mini-badge">KEY INSIGHT</div>
                    <h2>Balance grows from consistency, not perfection.</h2>
                    <p>
                        Hormonal wellness often improves gradually through small habits that
                        support your body over time. The goal is not to do everything at
                        once — it is to build a routine you can actually keep.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="hormone-cta">
                <div className="hormone-cta-content">
                    <div className="hormone-cta-badge">NEXT STEP</div>
                    <h2>Want recommendations made for your own health pattern?</h2>
                    <p>
                        Log in to explore personalized recommendation, prediction, and
                        tracking features designed to support your PCOS journey.
                    </p>
                    <button
                        className="hormone-primary-btn"
                        onClick={() => {
                            const token = localStorage.getItem("token");

                            if (token) {
                                navigate("/predict"); 
                            } else {
                                navigate("/login");
                            }
                        }}
                    >
                        Get Recommendations
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HormoneBalanceAwareness;