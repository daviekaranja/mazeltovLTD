import axios from "axios";
const prod = import.meta.env.PROD;
console.log(prod);
const axiosClient = axios.create({
  baseURL: prod ? "/api/v1" : "https://127.0.0.1:8000/api/v1", // Set the base path for production
});

export default axiosClient;
