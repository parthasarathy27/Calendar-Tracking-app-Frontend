// src/utils/api.js
import axios from 'axios';

// Set baseURL dynamically for development and production
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Use environment variable or fallback to localhost
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to log errors (Optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Admin API
export const getCompanies = async () => {
  try {
    const response = await api.get('/admin/company');
    if (Array.isArray(response.data)) {
      return response.data;  // Return only if it's an array
    }
    throw new Error('Response data is not an array');
  } catch (error) {
    console.error('Error fetching companies:', error.response?.data || error.message);
    throw error;
  }
};

export const addCompany = async (data) => {
  try {
    const response = await api.post('/admin/company', data);
    return response.data;
  } catch (error) {
    console.error('Error adding company:', error.response?.data || error.message);
    throw error;
  }
};

// User API
export const getDashboard = async () => {
  try {
    const response = await api.get('/user/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error.response?.data || error.message);
    throw error;
  }
};

export const logCommunication = async (data) => {
  try {
    const response = await api.post('/user/communication', data);
    return response.data;
  } catch (error) {
    console.error('Error logging communication:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
