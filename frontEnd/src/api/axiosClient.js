import axios from "axios";
const prod = import.meta.env.PROD;
console.log(prod);
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);
const axiosClient = axios.create({
  baseURL: prod ? "/api/v1" : apiUrl, // Set the base path for production
});

export default axiosClient;
