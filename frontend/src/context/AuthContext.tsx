'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authApi } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  city?: string;
  country?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string; city?: string; country?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check for existing token
  useEffect(() => {
    const token = localStorage.getItem('traveloop_token');
    if (token) {
      authApi.me()
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('traveloop_token');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { token, user: userData } = await authApi.login(email, password);
    localStorage.setItem('traveloop_token', token);
    setUser(userData);
  }, []);

  const register = useCallback(async (data: { name: string; email: string; password: string; phone?: string; city?: string; country?: string }) => {
    const { token, user: userData } = await authApi.register(data);
    localStorage.setItem('traveloop_token', token);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('traveloop_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
