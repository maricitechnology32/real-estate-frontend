import api from './axios';

export const toggleWishlistItem = async (propertyId) => {
  try {
    const response = await api.post(`/wishlist/toggle/${propertyId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// ADD THIS NEW FUNCTION
export const getWishlist = async () => {
  try {
    const response = await api.get('/wishlist');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};