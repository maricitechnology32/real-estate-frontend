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
    const response = await api.patch(`/inquiries/${inquiryId}`, { status });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTestimonialStatus = async (testimonialId, status) => {
  try {
    const response = await api.patch(`/testimonials/${testimonialId}`, { status });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getAdminAllAppointments = async () => {
  try {
    const response = await api.get('/appointments/all');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateAppointment = async (appointmentId, updateData) => {
  try {
    const response = await api.patch(`/appointments/${appointmentId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};