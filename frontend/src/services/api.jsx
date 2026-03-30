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

// export const forgotPassword = (data) =>
//   api.post("/forgot-password", data);

// export const resetPassword = (data) =>
//   api.post("/reset-password", data);


// ✅ PREDICTION API (NEW)
export const predictPCOS = (data) =>{
  const token = localStorage.getItem("token");

  return axios.post(
    "http://localhost:8000/prediction/predict",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ VERY IMPORTANT
      },
    }
  );
};
export default api;