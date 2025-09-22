import React, { createContext, useState, useEffect } from 'react';
import authService from '../api/apiClient.jsx';
import predictionService from '../api/predictionApi.jsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userData) => {
    const loggedInUser = await authService.login(userData);
    setUser(loggedInUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (userData) => {
    const registeredUser = await authService.register(userData);
    setUser(registeredUser);
  };

  const value = {
    user,
    login,
    logout,
    register,
    predictionService, // Providing the prediction service
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};