import api from './api';

export interface LoginData {
  emailOrPhone: string;
  password: string;
}

export interface RegisterData {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'BUYER' | 'SELLER' | 'AGENT';
}

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

class AuthService {
  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    if (response.data.success) {
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    }
    throw new Error(response.data.message);
  }

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    if (response.data.success) {
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    }
    throw new Error(response.data.message);
  }

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data.data;
  }

  async updatePassword(currentPassword: string, newPassword: string) {
    const response = await api.put('/auth/update-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  async forgotPassword(email: string) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(token: string, newPassword: string) {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();