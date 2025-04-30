import axios from 'axios';
import AuthService from './AuthService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the auth token
httpClient.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors
httpClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Unauthorized - clear local storage and redirect to login
      AuthService.logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default httpClient; 