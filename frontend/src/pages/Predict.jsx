import React, { useState, useEffect } from "react";
import "../styles/predict.css";
import { predictPCOS } from "../services/api";

const Predict = () => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    bmi: "",
    fast_food: false,
    exercise: false,
    cycle: false,
    hair_growth: false,
    skin_darkening: false,
    hair_loss: false,
    pimples: false,
  });

  const [result, setResult] = useState(null);

  useEffect(() => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100;
      const bmiValue = (
        formData.weight /
        (heightInMeters * heightInMeters)
      ).toFixed(2);

      setFormData((prev) => ({ ...prev, bmi: bmiValue }));
    }
  }, [formData.weight, formData.height]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // ✅ API CALL
  const handlePredict = async () => {
    try {
      const res = await predictPCOS(formData);
      console.log(res.data);
      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Prediction failed");
    }
  };

  return (
    <div className="predict-container">
      <header className="predict-header">
        <h1>
          Health Assessment & <span className="pink-text">Prediction</span>
        </h1>
        <p>
          Provide your details to analyze hormonal patterns using our AI model.
        </p>
      </header>

      <div className="form-card">
        {/* Vital Metrics */}
        <div className="form-section">
          <h3>
            <span className="icon">👤</span> Vital Metrics
          </h3>
          <div className="input-row">
            <div className="input-group">
              <label>Age (Years)</label>
              <input
                type="number"
                name="age"
                placeholder="e.g. 21"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                placeholder="e.g. 60"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                placeholder="e.g. 165"
                value={formData.height}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Calculated BMI</label>
              <input
                type="text"
                name="bmi"
                value={formData.bmi}
                readOnly
                className="readonly-input"
              />
            </div>
          </div>
        </div>

        {/* Clinical Indicators */}
        <div className="form-section">
          <h3>
            <span className="icon">📉</span> Clinical Indicators
          </h3>
          <div className="toggle-grid">
            {[
              { id: "cycle", label: "Regular Cycle?" },
              { id: "hair_growth", label: "Excessive Hair Growth" },
              { id: "skin_darkening", label: "Skin Darkening" },
              { id: "hair_loss", label: "Hair Loss/Thinning" },
              { id: "pimples", label: "Persistent Pimples" },
            ].map((item) => (
              <div className="toggle-group" key={item.id}>
                <span>{item.label}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={formData[item.id]}
                    onChange={() => handleToggle(item.id)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Lifestyle Factors */}
        <div className="form-section">
          <h3>
            <span className="icon">🍎</span> Lifestyle Factors
          </h3>
          <div className="toggle-list">
            <div className="toggle-group lifestyle">
              <span>Frequent Fast Food Consumption?</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.fast_food}
                  onChange={() => handleToggle("fast_food")}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="toggle-group lifestyle">
              <span>Regular Exercise (30min+)?</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.exercise}
                  onChange={() => handleToggle("exercise")}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        {/* ✅ FIXED BUTTON */}
        <button className="predict-btn" onClick={handlePredict}>
          Predict Outcome 📊
        </button>

        {/* --- Results Section --- */}
        <div className="results-wrapper">
          <div className="result-card">
            <div className="result-header">
              <h3>Prediction Result</h3>
              <span className="status-badge">ANALYSIS READY</span>
            </div>
            <div className="outcome-box">
              <div className="outcome-icon">🛡️</div>
              <div className="outcome-details">
                <p className="outcome-label">Probable Outcome</p>

                {/* ✅ FIXED RESULT */}
                <h2 className="outcome-value">
                  {result ? result.prediction : "Pending Input"}
                </h2>

              </div>
            </div>

            <div className="suggestions-list">
              <p className="suggestions-title">Key Suggestions:</p>
              <ul>
                <li>
                  <span className="check-icon">✔️</span> Fill out all fields for
                  accuracy.
                </li>
                <li>
                  <span className="lock-icon">🔒</span> Consult a medical
                  professional.
                </li>
              </ul>
            </div>
          </div>

          <div className="recommendation-cta">
            <div className="cta-content">
              <h3>Personalized Wellness Plan</h3>
              <p>
                Based on your analysis, we've curated specific dietary and
                lifestyle adjustments to help balance your hormones.
              </p>
            </div>
            <button
              className="view-rec-btn"
              onClick={() => (window.location.href = "/recommendations")}
            >
              View My Plan <span>→</span>
            </button>
          </div>

          <div className="info-card">
            <div className="info-header">
              <h4>Understanding PCOS</h4>
              <p>Hormonal balance affects more than just cycles.</p>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <div className="item-icon">🍎</div>
                <span>Dietary Care</span>
              </div>
              <div className="info-item">
                <div className="item-icon">🏋️</div>
                <span>Activity</span>
              </div>
            </div>
            <div className="support-footer">
              <div className="support-icon">💜</div>
              <div className="support-text">
                <strong>You're not alone.</strong>
                <p>
                  PCOS affects 1 in 10 women globally. Managing it is a journey
                  of self-love.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Predict;