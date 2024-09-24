import axiosClient from "../api/axiosClient";

class ApiService {
  // GET Request
  async get(url, params = {}) {
    try {
      const response = await axiosClient.get(url, { params });
      return response.data; // Return the response data
    } catch (error) {
      this.handleError(error);
    }
  }

  // POST Request
  async post(url, data) {
    try {
      const response = await axiosClient.post(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // PUT Request
  async put(url, data) {
    try {
      const response = await axiosClient.put(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // DELETE Request
  async delete(url, params = {}) {
    try {
      const response = await axiosClient.delete(url, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Centralized Error Handling
  handleError(error) {
    if (error.status === 404) {
      console.error("API endpoint not found");
    } else if (error.status === 500) {
      console.error("Internal server error");
    } else {
      console.error(error.message || "Something went wrong");
    }
    throw error; // Optionally re-throw error to handle it further up the chain
  }
}

export default new ApiService();
