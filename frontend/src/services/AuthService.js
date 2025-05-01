import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Evento customizado para notificar mudanças na autenticação
const notifyAuthChange = () => {
  window.dispatchEvent(new Event('auth-changed'));
};

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/managers/login`, {
        email,
        password
      });
      
      // Salvar dados no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Notificar outros componentes sobre a mudança
      notifyAuthChange();
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Notificar outros componentes sobre a mudança
    notifyAuthChange();
  }
  
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      this.logout(); // Limpar dados corrompidos
      return null;
    }
  }
  
  getToken() {
    return localStorage.getItem('token');
  }
  
  isAuthenticated() {
    const hasToken = !!this.getToken();
    const hasUser = !!this.getCurrentUser();
    return hasToken && hasUser;
  }
}

export default new AuthService(); 