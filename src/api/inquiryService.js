import api from './axios';

export const submitInquiry = async (inquiryData) => {
  try {
     
    const response = await api.post('/inquiries', inquiryData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getMyInquiries = async () => {
  try {
    const response = await api.get('/inquiries/my-inquiries');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};  