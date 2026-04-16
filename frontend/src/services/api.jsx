import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

//  Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token attached to request:", token);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//  AUTH API
export const loginUser = (data) => api.post("/login", data);
export const registerUser = (data) => api.post("/register", data);
export const forgotPassword = (data) => api.post("/forgot-password", data);
export const resetPassword = (data) => api.post("/reset-password", data);

//  PREDICTION API
export const predictPCOS = (data) => {return api.post("/prediction/predict", data);};

//  RECOMMENDATION API
export const getRecommendation = (data) => {return api.post("/recommendation/", data);};

// TRACKING APIs
export const getCycles = () => api.get("/tracking/cycles");
export const saveCycle = (data) => api.post("/tracking/cycle", data);
export const getSymptoms = () => api.get("/tracking/symptoms");
export const logSymptom = (data) => api.post("/tracking/symptoms", data);
export const getPrediction = () => api.get("/tracking/predict-next-period");

// CHATBOT API
export const sendMessage = (message) => api.post("/chatbot/", { message });

export default api;