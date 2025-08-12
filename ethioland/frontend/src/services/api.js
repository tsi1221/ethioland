import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ethioland_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('ethioland_token');
      localStorage.removeItem('ethioland_user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You do not have permission for this action.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.response?.status === 404) {
      toast.error('Resource not found.');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
  logout: () => api.post('/auth/logout'),
};

// Properties API endpoints
export const propertiesAPI = {
  getProperties: (params) => api.get('/properties', { params }),
  getProperty: (id) => api.get(`/properties/${id}`),
  createProperty: (propertyData) => api.post('/properties', propertyData),
  updateProperty: (id, propertyData) => api.put(`/properties/${id}`, propertyData),
  deleteProperty: (id) => api.delete(`/properties/${id}`),
  uploadImages: (propertyId, formData) => 
    api.post(`/properties/${propertyId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  addToFavorites: (propertyId) => api.post(`/properties/${propertyId}/favorite`),
  removeFromFavorites: (propertyId) => api.delete(`/properties/${propertyId}/favorite`),
  getFavorites: () => api.get('/properties/favorites'),
};

// Users API endpoints
export const usersAPI = {
  getUsers: (params) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Messages API endpoints
export const messagesAPI = {
  getMessages: () => api.get('/messages'),
  sendMessage: (messageData) => api.post('/messages', messageData),
  markAsRead: (messageId) => api.patch(`/messages/${messageId}/read`),
  deleteMessage: (messageId) => api.delete(`/messages/${messageId}`),
};

// Payments API endpoints
export const paymentsAPI = {
  getPayments: () => api.get('/payments'),
  initializePayment: (paymentData) => api.post('/payments/initialize', paymentData),
  verifyPayment: (transactionId) => api.get(`/payments/verify/${transactionId}`),
  getPaymentMethods: () => api.get('/payments/methods'),
};

// Admin API endpoints
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getPendingProperties: () => api.get('/admin/properties/pending'),
  approveProperty: (propertyId, adminNotes) => 
    api.patch(`/admin/properties/${propertyId}/approve`, { adminNotes }),
  rejectProperty: (propertyId, reason) => 
    api.patch(`/admin/properties/${propertyId}/reject`, { reason }),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  updateUserRole: (userId, role) => 
    api.patch(`/admin/users/${userId}/role`, { role }),
  deactivateUser: (userId) => api.patch(`/admin/users/${userId}/deactivate`),
  activateUser: (userId) => api.patch(`/admin/users/${userId}/activate`),
  getSystemLogs: (params) => api.get('/admin/logs', { params }),
  getAnalytics: (params) => api.get('/admin/analytics', { params }),
};

// File upload utility
export const uploadFile = async (file, type = 'image') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search utilities
export const searchAPI = {
  searchProperties: (query, filters) => 
    api.get('/search/properties', { params: { q: query, ...filters } }),
  getSearchSuggestions: (query) => 
    api.get('/search/suggestions', { params: { q: query } }),
  getLocationSuggestions: (query) => 
    api.get('/search/locations', { params: { q: query } }),
};

// Map utilities
export const mapAPI = {
  getPropertiesInBounds: (bounds) => 
    api.get('/map/properties', { params: bounds }),
  reverseGeocode: (lat, lng) => 
    api.get('/map/reverse-geocode', { params: { lat, lng } }),
  getNearbyPlaces: (lat, lng, type) => 
    api.get('/map/nearby', { params: { lat, lng, type } }),
};

export default api;