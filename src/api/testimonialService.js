import api from './axios';

// Fetches all testimonials with 'Approved' status (for public view)
export const getApprovedTestimonials = async () => {
  try {
    const response = await api.get('/testimonials');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Submits a new testimonial (for logged-in users)
export const createTestimonial = async (testimonialData) => {
  try {
    const response = await api.post('/testimonials', testimonialData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};