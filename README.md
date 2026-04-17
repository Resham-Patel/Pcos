# FEMWELL - PCOS Support System

## Overview

The **FemWell - PCOS Support System** is a full-stack web application designed to assist users in understanding and managing Polycystic Ovary Syndrome (PCOS). The system integrates machine learning, rule-based logic, and AI-powered interactions to provide prediction, personalized recommendations, chatbot assistance, and cycle tracking.

---

## Key Features

### PCOS Prediction

* Uses **Logistic Regression** for predicting PCOS likelihood.
* Based on user input data and trained model.
* Provides quick and data-driven results.

### Personalized Recommendations

* Rule-based system for generating health suggestions.
* Enhanced with **OpenRouter API** for more contextual and dynamic guidance.
* Covers lifestyle, diet, and wellness suggestions.

### AI Chatbot

* Integrated chatbot powered by **OpenRouter**.
* Provides conversational support for PCOS-related queries.
* Helps users with general awareness and guidance.

### Cycle & Health Tracking

* Users can:

  * Add menstrual cycle records
  * Log weekly health data (stress, sleep, mood, etc.)
* Calendar-based visualization of:

  * Period days
  * Logged symptoms
* Tracks logs from **last period till current date**
* Displays prediction insights dynamically

---

## Installation & Setup

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Tech Stack

### Frontend

* React.js – Component-based UI development
* React Router – Navigation between pages

### Backend

* FastAPI – API development and request handling
* Python – Core backend logic

### Database

* PostgreSQL – Relational database
* SQLAlchemy – ORM for database interaction

### Machine Learning

* Logistic Regression – PCOS prediction model

### APIs & Integrations

* OpenRouter – Chatbot and enhanced recommendations

### Tools & Platforms

* VS Code – Development environment
* Git & GitHub – Version control
* Postman – API testing
* NPM – Dependency management

---

## System Workflow

1. User registers and logs into the system
2. User can:

   * Input health data for prediction
   * Receive PCOS prediction result
   * View personalized recommendations
   * Interact with chatbot
   * Track cycles and weekly health logs
3. Prediction module uses:

   * Last 3 cycle records
   * Health logs since last period
4. System dynamically updates predictions and insights

---

## Highlights

* Combines **Machine Learning + Rule-Based Logic + AI APIs**
* No dataset required for tracking module (user-driven data)
* Dynamic and personalized user experience
* Clean and interactive UI with calendar-based tracking

---

## Future Enhancements

* More advanced ML models for prediction
* Data visualization dashboards
* Notifications and reminders
* Improved personalization using user history

---

## Conclusion

This system aims to provide a **comprehensive, user-friendly platform** for PCOS awareness, prediction, and management by combining modern web technologies with intelligent backend logic and AI-powered features.

---