import api from './axios';

export const getAllProperties = async (filters = {}) => {
  try {
    // Convert the filters object into a query string
    const params = new URLSearchParams(filters);
    const response = await api.get(`/properties?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPropertyById = async (id) => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAdminAllProperties = async () => {
  try {
    const response = await api.get('/properties/admin/all');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProperty = async (formData) => {
  try {
    // Axios will automatically set the correct Content-Type for FormData
    const response = await api.post('/properties', formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProperty = async (id, formData) => {
  try {
     const response = await api.patch(`/properties/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};