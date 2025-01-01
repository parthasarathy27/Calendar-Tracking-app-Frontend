import axios from 'axios';

const api = axios.create({
  baseURL: 'calendar-tracking-app-backend.vercel.app/api', // Adjust if backend is running on a different port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin API
export const getCompanies = () => api.get('/admin/company');
export const addCompany = (data) => api.post('/admin/company', data);

// Delete company API call
export const deleteCompany = async (companyId) => {
  try {
    if (!companyId) {
      throw new Error("Company ID is missing.");
    }
    const response = await api.delete(`/admin/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Re-throw error to be caught by calling function
  }
};

// User API
export const getDashboard = () => api.get('/user/dashboard'); // Fetch dashboard data for user
export const logCommunication = (data) => api.post('/user/communication', data); // Log a new communication

export default api;
