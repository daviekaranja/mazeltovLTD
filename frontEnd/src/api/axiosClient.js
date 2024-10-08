import axios from "axios";
const prod = import.meta.env.PROD;
import Login from "../components/Login";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: prod ? "/api/v1" : apiUrl, // Set the base path for production
});

axiosClient.interceptors.request.use(
  (config) => {
    // Modify headers
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle the response error
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized. Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
