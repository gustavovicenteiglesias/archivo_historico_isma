import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { API_BASE_URL } from '../api/client';
import { getMe, loginAdmin } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('isma_token');
    if (!token) {
      setLoading(false);
      return;
    }
    getMe()
      .then(setUser)
      .catch((err) => {
        localStorage.removeItem('isma_token');
        if (err.response?.status === 403) {
          window.location.href = '/usuario-bloqueado';
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isAdmin: user?.rol === 'ADMIN',
    loginWithGoogle: () => {
      window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
    },
    handleToken: async (token) => {
      localStorage.setItem('isma_token', token);
      const me = await getMe();
      setUser(me);
      return me;
    },
    adminLogin: async (email, password) => {
      const result = await loginAdmin(email, password);
      localStorage.setItem('isma_token', result.token);
      setUser(result.user);
      return result.user;
    },
    logout: () => {
      localStorage.removeItem('isma_token');
      setUser(null);
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
