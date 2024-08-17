// src/axiosInstance.js
import axios from 'axios';

// Create an Axios instance with a base URL and token in headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token from local storage
        const response = await axiosInstance.post('/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('authToken', response.data.access); // Store new access token
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest); // Retry original request with new token
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Redirect to login page if refresh fails
        window.location.href = '/login/';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
