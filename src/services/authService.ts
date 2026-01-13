import axios from 'axios';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'borrower' | 'bank-officer' | 'compliance';
  verification_status: string;
  phone?: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const authService = {
  signup: async (email: string, password: string, firstName: string, lastName: string, phone: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone,
      });
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Signup failed');
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${API_URL}/api/auth/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getCurrentToken: (): string | null => {
    return localStorage.getItem('token');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  getCurrentRole: (): string | null => {
    const user = authService.getCurrentUser();
    return user ? user.role : null;
  },

  getMe: async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch user data');
    }
  },
};

export default authService;