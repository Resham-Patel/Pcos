import React from "react";

import { useNavigate } from "react-router-dom";
import "../styles/exerciseGuide_awareness.css";

const ExerciseGuideAwareness = () => {
    const navigate = useNavigate();
    return (
        <div className="exercise-page">
            {/* HERO */}
            <section className="exercise-hero">
                <div className="exercise-hero-badge">AWARENESS GUIDE</div>
                <h1>Exercise Guide for PCOS</h1>
                <p>
                    Gentle, sustainable movement can support hormonal health, energy,
                    mood, and overall well-being. You do not need intense workouts to get
                    started.
                </p>
            </section>

            {/* WHY IT HELPS */}
            <section className="exercise-section">
                <div className="section-heading">
                    <h2>Why movement matters</h2>
                    <p>
                        Beginner-friendly exercise may help support insulin sensitivity,
                        stress balance, energy levels, and daily routine building.
                    </p>
                </div>

                <div className="benefits-grid">
                    <div className="benefit-card soft-pink">
                        <div className="benefit-icon">⚡</div>
                        <h3>Boosts Energy</h3>
                        <p>
                            Light, regular movement may help reduce sluggishness and improve
                            how energized you feel during the day.
                        </p>
                    </div>

                    <div className="benefit-card soft-blue">
                        <div className="benefit-icon">🩺</div>
                        <h3>Supports Metabolism</h3>
                        <p>
                            Consistent activity can help support insulin sensitivity and
                            overall metabolic health.
                        </p>
                    </div>

                    <div className="benefit-card soft-green">
                        <div className="benefit-icon">🌿</div>
                        <h3>Reduces Stress</h3>
                        <p>
                            Walking, yoga, and breathing-based movement can support a calmer
                            nervous system and emotional balance.
                        </p>
                    </div>
                </div>
            </section>

            {/* ROUTINE TYPES */}
            <section className="exercise-section">
                <div className="section-heading">
                    <h2>Beginner-friendly routines</h2>
                    <p>
                        Start with simple forms of movement that feel manageable and safe,
                        especially if you are building consistency for the first time.
                    </p>
                </div>

                <div className="routine-types-grid">
                    <div className="routine-type-card">
                        <div className="routine-type-icon">🚶‍♀️</div>
                        <h3>Walking</h3>
                        <p>
                            One of the easiest ways to begin. A short daily walk can support
                            energy, mood, and activity levels.
                        </p>
                        <div className="routine-duration">10–30 mins</div>
                    </div>

                    <div className="routine-type-card">
                        <div className="routine-type-icon">🧘‍♀️</div>
                        <h3>Yoga</h3>
                        <p>
                            Gentle yoga may help with flexibility, stress relief, and body
                            awareness while keeping movement low impact.
                        </p>
                        <div className="routine-duration">15–25 mins</div>
                    </div>

                    <div className="routine-type-card">
                        <div className="routine-type-icon">💪</div>
                        <h3>Light Strength Work</h3>
                        <p>
                            Bodyweight exercises or light resistance can support strength and
                            metabolism without needing advanced routines.
                        </p>
                        <div className="routine-duration">15–20 mins</div>
                    </div>

                    <div className="routine-type-card">
                        <div className="routine-type-icon">🎵</div>
                        <h3>Low-Impact Dance</h3>
                        <p>
                            Fun movement like dance or Zumba-style sessions can make exercise
                            feel more enjoyable and easier to maintain.
                        </p>
                        <div className="routine-duration">15–30 mins</div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="exercise-cta">
                <div className="exercise-cta-content">
                    <div className="exercise-cta-badge">NEXT STEP</div>
                    <h2>Ready to make movement part of your routine?</h2>
                    <p>
                        Log in to track your progress, explore more personalized wellness
                        tools, and build a routine that fits your journey.
                    </p>
                    <button
                        className="exercise-primary-btn"
                        onClick={() => navigate("/login")}
                    >
                        Track Your Progress (Login Required)
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ExerciseGuideAwareness;