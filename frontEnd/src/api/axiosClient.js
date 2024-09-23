import axios from "axios";
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
  responseType: "json",
});

axiosClient.interceptors.request.use((request) => {
  return request;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle Network Errors (Device Offline or Server Unreachable)
    if (!error.response) {
      if (navigator.onLine) {
        console.log(error.message);
      } else {
        // Device is offline
        console.error("No internet connection:", error.message);
      }
      return Promise.reject(
        new Error("Network Error - Please check your connection")
      );
    }

    // Handle HTTP Errors
    const status = error.response.status;

    if (status >= 500) {
      // Server errors
      console.error("Server Error:", error.response.data);
    } else if (status >= 400) {
      // Client errors
      console.error("Client Error:", error.response.data);
    }

    // Retry logic for network errors
    if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
      console.error("Network Error - retrying request");
    }

    return Promise.reject(error); // Reject the promise with the error object
  }
);

export default axiosClient;
