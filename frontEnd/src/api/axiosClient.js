import axios from "axios";
const prod = import.meta.env.PROD;

const apiUrl = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: prod ? "/api/v1" : apiUrl, // Set the base path for production
});

axiosClient.interceptors.request.use(
  (config) => {
    // Modify headers
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage (or from another source)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Set the Authorization header
    }
    config.headers["Content-Type"] = "application/json"; // Set other custom headers if necessary
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
      // Handle 401 Unauthorized error (e.g., redirect to login)
      console.log("Unauthorized. Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
