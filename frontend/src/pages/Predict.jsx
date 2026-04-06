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

  const getRiskLevel = (probability) => {
    const prob = probability > 1 ? probability / 100 : probability;

    if (prob >= 0.65) return "High Risk";
    if (prob >= 0.35) return "Moderate Risk";
    return "Low Risk";
  };

  const getRiskMessage = (riskLevel) => {
    if (riskLevel === "High Risk") {
      return "Your symptom pattern suggests a higher likelihood profile. Please consider consulting a medical professional for proper evaluation.";
    }
    if (riskLevel === "Moderate Risk") {
      return "Your symptom pattern shows some important indicators. Monitoring your health and following a balanced lifestyle plan is recommended.";
    }
    return "Your current symptom pattern suggests a lower likelihood profile, but regular tracking and healthy habits still matter.";
  };

  const getRiskClass = (riskLevel) => {
    if (riskLevel === "High Risk") return "risk-high";
    if (riskLevel === "Moderate Risk") return "risk-moderate";
    return "risk-low";
  };

  const handlePredict = async () => {
    try {
      const formattedData = {
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        bmi: parseFloat(formData.bmi),
      };

      const res = await predictPCOS(formattedData);
      console.log(res.data);
      setResult(res.data);

      const probabilityValue =
        typeof res.data.probability !== "undefined"
          ? res.data.probability
          : typeof res.data.confidence !== "undefined"
          ? res.data.confidence
          : 0;

      const normalizedProbability =
        probabilityValue > 1 ? probabilityValue / 100 : probabilityValue;

      const recommendationPayload = {
        prediction: res.data.prediction,
        probability: Number((normalizedProbability * 100).toFixed(2)),
        risk_level: getRiskLevel(normalizedProbability),
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        bmi: parseFloat(formData.bmi),
        fast_food: formData.fast_food,
        exercise: formData.exercise,
        cycle: formData.cycle,
        pimples: formData.pimples,
        hair_growth: formData.hair_growth,
        skin_darkening: formData.skin_darkening,
        hair_loss: formData.hair_loss,
      };

      localStorage.setItem(
        "recommendationData",
        JSON.stringify(recommendationPayload)
      );
    } catch (err) {
      console.log(err);
      alert("Prediction failed");
    }
  };

  const probabilityValue =
    result && typeof result.probability !== "undefined"
      ? result.probability
      : result && typeof result.confidence !== "undefined"
      ? result.confidence
      : null;

  const normalizedProbability =
    probabilityValue !== null
      ? probabilityValue > 1
        ? probabilityValue / 100
        : probabilityValue
      : null;

  const probabilityPercent =
    normalizedProbability !== null
      ? (normalizedProbability * 100).toFixed(2)
      : null;

  const riskLevel =
    normalizedProbability !== null
      ? getRiskLevel(normalizedProbability)
      : "Pending Input";

  const riskClass =
    normalizedProbability !== null ? getRiskClass(riskLevel) : "";

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

        <div className="form-section">
          <h3>
            <span className="icon">📉</span> Clinical Indicators
          </h3>
          <div className="toggle-grid">
            {[
              { id: "cycle", label: "Irregular Cycle?" },
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

        <button className="predict-btn" onClick={handlePredict}>
          Predict Outcome 📊
        </button>

        <div className="results-wrapper">
          <div className="result-card">
            <div className="result-header">
              <h3>Prediction Result</h3>
              <span className="status-badge">ANALYSIS READY</span>
            </div>

            <div className={`outcome-box ${riskClass}`}>
              <div className="outcome-icon">
                {riskLevel === "High Risk"
                  ? "⚠️"
                  : riskLevel === "Moderate Risk"
                  ? "🩺"
                  : "🛡️"}
              </div>

              <div className="outcome-details">
                <p className="outcome-label">Estimated Risk Level</p>

                <h2 className={`outcome-value ${riskClass}`}>
                  {riskLevel}
                </h2>

                {probabilityPercent && (
                  <p className="probability-text">
                    Risk Probability: {probabilityPercent}%
                  </p>
                )}

                {probabilityPercent && (
                  <p className="result-message">
                    {getRiskMessage(riskLevel)}
                  </p>
                )}
              </div>
            </div>

            <div className="suggestions-list">
              <p className="suggestions-title">Key Suggestions:</p>
              <ul>
                <li>
                  <span className="check-icon">✔️</span>
                  Complete all fields carefully for a more reliable estimate.
                </li>
                <li>
                  <span className="lock-icon">🔒</span>
                  This result is a screening estimate and not a medical diagnosis.
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
              onClick={() => {
                if (!result) {
                  alert("Please run prediction first.");
                  return;
                }
                window.location.href = "/recommendations";
              }}
            >
              View My Plan <span>→</span>
            </button>
          </div>

          <div className="info-card">
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
  );
};

export default Predict;