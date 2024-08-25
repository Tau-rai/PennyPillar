import axios from 'axios';

// Helper function to get the CSRF token from the DOM
const getCsrfToken = () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]');
  return csrfToken ? csrfToken.getAttribute('content') : '';
};

// Create an Axios instance with a base URL and token in headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token and CSRF token
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken'); // Retrieve auth token from local storage
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`; // Set Authorization header
    }

    // Include the CSRF token in the headers
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken; // Set CSRF token header
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
    
    // Skip token refresh logic for specific routes (e.g., sign-up, login)
    const excludedRoutes = ['/signup/', '/login/', '/token/refresh/'];
    if (excludedRoutes.some(route => originalRequest.url.includes(route))) {
      return Promise.reject(error); // Skip retry logic for these routes
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token from local storage
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
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
