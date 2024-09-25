import axiosClient from "../api/axiosClient";

class ApiService {
  // GET Request
  async get(url, params = {}) {
    try {
      const response = await axiosClient.get(url, params);
      return this.handleSuccess(response); // Handle success and return response data
    } catch (error) {
      return this.handleError(error); // Handle and format errors
    }
  }

  // POST Request
  async post(url, data) {
    try {
      const response = await axiosClient.post(url, data);
      return this.handleSuccess(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PUT Request
  async put(url, data) {
    try {
      const response = await axiosClient.put(url, data);
      return this.handleSuccess(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // DELETE Request
  async delete(url, params = {}) {
    try {
      const response = await axiosClient.delete(url, { params });
      return this.handleSuccess(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Centralized Success Handler
  handleSuccess(response) {
    return { success: true, data: response.data }; // Standardize the success response
  }

  // Centralized Error Handling
  handleError(error) {
    if (error.response) {
      // Server responded with an error (e.g., 4xx, 5xx)
      const { status, data } = error.response;
      const formattedError = {
        success: false,
        statusCode: status,
        message: data?.message || "Something went wrong.",
        details: data?.errors || null, // Optional: additional error details
      };
      return formattedError;
    } else if (error.request) {
      // No response received from the server
      return {
        success: false,
        message: "No response from the server. Please check your network.",
      };
    } else {
      // Other errors (e.g., request setup issues)
      return {
        success: false,
        message: error.message || "An unknown error occurred.",
      };
    }
  }
}

export default new ApiService();
