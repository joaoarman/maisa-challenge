import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const notifyAuthChange = () => {
  window.dispatchEvent(new Event('auth-changed'));
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/managers/login`, {
      email,
      password
    });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    notifyAuthChange();
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  notifyAuthChange();
};

const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch (error) {
    logout();
    return null;
  }
};

const getToken = () => {
  return localStorage.getItem('token');
};

const isAuthenticated = () => {
  const hasToken = !!getToken();
  const hasUser = !!getCurrentUser();
  return hasToken && hasUser;
};

export default {
  login,
  logout,
  getCurrentUser,
  getToken,
  isAuthenticated
}; 