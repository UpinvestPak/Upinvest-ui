"use client";
import { client } from '@/utils/apolloClient';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  checkAuth: () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = (): boolean => {
    return isAuthenticated;
  };

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const isValid = !!token;
    setIsAuthenticated(isValid);
  }, []);

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    client.resetStore();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
