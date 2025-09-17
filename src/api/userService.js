import api from './axios';

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.patch('/users/update-profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// ADD THIS FUNCTION
export const changePassword = async (passwordData) => {
  try {
    const response = await api.post('/users/change-password', passwordData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// ADD THIS FUNCTION
export const updateUserAvatar = async (formData) => {
  try {
    const response = await api.patch('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};