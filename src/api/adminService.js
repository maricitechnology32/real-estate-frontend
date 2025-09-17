import api from './axios';

// Fetches all inquiries for the admin dashboard
export const getAdminAllInquiries = async () => {
  try {
    const response = await api.get('/inquiries');

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetches all testimonials for the admin dashboard
export const getAdminAllTestimonials = async () => {
  try {
    const response = await api.get('/testimonials/all');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateInquiryStatus = async (inquiryId, status) => {
  try {
    // Corrected URL, removing the '/admin' part
    const response = await api.patch(`/inquiries/${inquiryId}`, { status });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};