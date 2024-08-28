import axiosClient from "./axiosClient";

// Create
export const createEntity = async (entityType, entityData) => {
  try {
    const response = await axiosClient.post(`/${entityType}`, entityData);
    return response.data;
  } catch (error) {
    console.error(`Failed to create ${entityType}:`, error);
    throw error;
  }
};

// Read
export const getEntities = async (entityType) => {
  try {
    const response = await axiosClient.get(`/${entityType}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${entityType}:`, error);
    throw error;
  }
};

export const getEntityById = async (entityType, id) => {
  try {
    const response = await axiosClient.get(`/${entityType}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${entityType} by ID:`, error);
    throw error;
  }
};

// Update
export const updateEntity = async (entityType, id, updatedData) => {
  try {
    const response = await axiosClient.put(`/${entityType}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update ${entityType}:`, error);
    throw error;
  }
};

// Delete
export const deleteEntity = (path, entityId) => {
  axiosClient
    .delete(`/${path}/${entityId}`)
    .then((response) => {
      console.log(`Status Code: ${response.status}`);
    })
    .catch((error) => {
      console.error(`Failed to delete product: ${error.message}`);
      if (error.response) {
        console.log(`Error Status Code: ${error.response.status}`);
      }
    });
};
