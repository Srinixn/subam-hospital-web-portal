import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchApi, AdminUser } from '../services/api';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (user: AdminUser) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetchApi<{ success: boolean; user: AdminUser }>('auth/me');
        if (response.success && response.user) {
          setUser(response.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (newUser: AdminUser) => {
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await fetchApi('auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
