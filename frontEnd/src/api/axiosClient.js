// import axios from "axios";
// import { showErrorToast } from "../utils/utilities";
// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     withCredentials: true,
//   },
//   responseType: "json",
// });

// // Response interceptor
// axiosClient.interceptors.response.use(
//   (response) => {
//     return response; // If successful, simply return the response
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle Network Errors (Device Offline or Server Unreachable)
//     if (!error.response) {
//       if (navigator.onLine) {
//         // Device is online but server did not respond
//         showErrorToast("", error.message);
//       } else {
//         // Device is offline
//         console.error("No internet connection:", error.message);
//       }

//       // Optionally, provide user feedback or handle offline state
//       // e.g., toast error or alert
//       return Promise.reject(
//         new Error("Network Error - Please check your connection")
//       );
//     }

//     // Handle HTTP Errors
//     const status = error.response.status;

//     if (status >= 500) {
//       // Server errors
//       console.error("Server Error:", error.response.data);
//       // Optionally, provide user feedback or handle server errors
//       // e.g., toast error or alert
//     } else if (status >= 400) {
//       // Client errors
//       console.error("Client Error:", error.response.data);
//       // Optionally, provide user feedback or handle client errors
//       // e.g., toast error or alert
//     }

//     // Retry logic for network errors
//     if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
//       console.error("Network Error - retrying request");

//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         return axiosClient(originalRequest);
//       }
//     }

//     return Promise.reject(error); // Reject the promise with the error object
//   }
// );

// export default axiosClient;

// import axios from "axios";
// import { showErrorToast } from "../utils/utilities";

// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     withCredentials: true,
//   },
//   responseType: "json",
// });

// // Create a singleton instance of the toast

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response; // If successful, simply return the response
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle Network Errors (Device Offline or Server Unreachable)
//     if (!error.response) {
//       if (navigator.onLine) {
//         // Device is online but server did not respond

//       } else {
//         // Device is offline
//         console.error("No internet connection:", error.message);
//         toastManager.error({
//           id: "offline-error", // Unique id for the toast
//           title: "Offline",
//           message: "You are currently offline.",
//         });
//       }

//       // Optionally, provide user feedback or handle offline state
//       return Promise.reject(
//         new Error("Network Error - Please check your connection")
//       );
//     }

//     // Handle HTTP Errors
//     const status = error.response.status;

//     if (status >= 500) {
//       // Server errors
//       console.error("Server Error:", error.response.data);
//       toastManager.error({
//         id: "server-error", // Unique id for the toast
//         title: "Server Error",
//         message: "Something went wrong on the server.",
//       });
//     } else if (status >= 400) {
//       // Client errors
//       console.error("Client Error:", error.response.data);
//       toastManager.error({
//         id: "client-error", // Unique id for the toast
//         title: "Client Error",
//         message: "There was an issue with your request.",
//       });
//     }

//     // Retry logic for network errors
//     if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
//       console.error("Network Error - retrying request");

//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         return axiosClient(originalRequest);
//       }
//     }

//     return Promise.reject(error); // Reject the promise with the error object
//   }
// );

// export default axiosClient;

import axios from "axios";
import { showErrorToast } from "../utils/utilities";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
  responseType: "json",
});

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response; // If successful, simply return the response
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle Network Errors (Device Offline or Server Unreachable)
    if (!error.response) {
      if (navigator.onLine) {
        // Device is online but server did not respond
        await showErrorToast("network-error", "Network Error", error.message);
      } else {
        // Device is offline
        console.error("No internet connection:", error.message);
        await showErrorToast(
          "offline-error",
          "Offline",
          "You are currently offline."
        );
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
      await showErrorToast(
        "server-error",
        "Server Error",
        "Something went wrong on the server."
      );
    } else if (status >= 400) {
      // Client errors
      console.error("Client Error:", error.response.data);
      await showErrorToast(
        "client-error",
        "Client Error",
        "There was an issue with your request."
      );
    }

    // Retry logic for network errors
    if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
      console.error("Network Error - retrying request");

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        return axiosClient(originalRequest);
      }
    }

    return Promise.reject(error); // Reject the promise with the error object
  }
);

export default axiosClient;
