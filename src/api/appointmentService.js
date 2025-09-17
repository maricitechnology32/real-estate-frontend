import api from './axios';

export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getUserAppointments = async () => {
  try {
    const response = await api.get('/appointments');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};