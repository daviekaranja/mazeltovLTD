import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // "https://127.0.0.1:8000/api/v1", // Replace with your actual base URL
});

export default axiosClient;
