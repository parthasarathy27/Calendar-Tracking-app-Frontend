// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Adjust if backend is running on a different port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin API
export const getCompanies = () => api.get('/admin/company');
export const addCompany = (data) => api.post('/admin/company', data);

// User API
export const getDashboard = () => api.get('/user/dashboard'); // Fetch dashboard data for user
export const logCommunication = (data) => api.post('/user/communication', data); // Log a new communication

export default api;
