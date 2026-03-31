import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

// 🔐 Attach token automatically
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

// 🔥 AUTH APIs
export const loginUser = (data) => api.post("/login", data);
export const registerUser = (data) => api.post("/register", data);
export const forgotPassword = (data) => api.post("/forgot-password", data);
export const resetPassword = (data) => api.post("/reset-password", data);

// ✅ PREDICTION API
export const predictPCOS = (data) => {
  return api.post("/prediction/predict", data);
};

// ✅ RECOMMENDATION API
export const getRecommendation = (data) => {
  return api.post("/recommendation/", data);
};

export default api;