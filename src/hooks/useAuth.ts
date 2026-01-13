import { useState, useCallback, useEffect } from 'react';
import authService from '../services/authService';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'borrower' | 'bank-officer' | 'compliance';
  verification_status: string;
  profile_completed?: boolean;
  phone?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lsfiData, setLsfiData] = useState<any>(null);

  // Initialize user from localStorage and fetch their data
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);

          // Fetch user's full data including LSFI score
          try {
            const userData = await authService.getMe(token);
            if (userData.lsfiScore) {
              setLsfiData(userData.lsfiScore);
            }
          } catch (err) {
            console.warn('Could not fetch user LSFI data:', err);
          }
        } catch (err) {
          console.error('Failed to parse stored user', err);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signup = useCallback(
    async (email: string, password: string, firstName: string, lastName: string, phone: string) => {
      try {
        setError(null);
        setLoading(true);

        const response = await authService.signup(email, password, firstName, lastName, phone);

        const userData: User = response.user;

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.token);

        setUser(userData);
        setIsAuthenticated(true);

        return userData;
      } catch (err: any) {
        const errorMsg = err.message || 'Signup failed';
        setError(errorMsg);
        throw new Error(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setError(null);
        setLoading(true);

        const response = await authService.login(email, password);

        const userData: User = response.user;

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.token);

        setUser(userData);
        setIsAuthenticated(true);

        // Fetch user's full data including LSFI score
        try {
          const fullUserData = await authService.getMe(response.token);
          if (fullUserData.lsfiScore) {
            setLsfiData(fullUserData.lsfiScore);
          }
        } catch (err) {
          console.warn('Could not fetch user LSFI data:', err);
        }

        return userData;
      } catch (err: any) {
        const errorMsg = err.message || 'Login failed';
        setError(errorMsg);
        throw new Error(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setLsfiData(null);
  }, []);

  const getCurrentRole = useCallback((): string | null => {
    return user?.role || null;
  }, [user]);

  const getCurrentUser = useCallback((): User | null => {
    return user;
  }, [user]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    getCurrentRole,
    getCurrentUser,
    lsfiData,
  };
};
