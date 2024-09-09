import axios from "axios";
import { showErrorToast } from "../utils/utilities";
import { useState } from "react";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
  responseType: "json",
});

axiosClient.interceptors.request.use((request) => {
  console.log(request.headers);
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
