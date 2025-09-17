import api from './axios'; // Our configured axios instance

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    // Our axios instance will automatically send the necessary auth cookie
    const response = await api.post('/users/logout');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/users/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await api.post(`/users/reset-password/${token}`, { password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};