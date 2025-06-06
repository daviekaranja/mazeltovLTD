import axios from "axios";

const isProd = import.meta.env.PROD;
const apiUrl = isProd
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/api/v1";

console.log(apiUrl);
const axiosClient = axios.create({
  baseURL: apiUrl,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized. Redirecting to login...");
      // Optionally, trigger a logout or redirect here
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
