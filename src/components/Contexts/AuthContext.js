import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    // This would typically be an API call to verify the token
    // For demo purposes, we'll just check localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // This would be your actual API call
      // For demo purposes, we'll simulate a successful login
      const userData = {
        id: 'user123',
        email,
        name: email.split('@')[0],
      };
      
      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      // This would be your actual API call
      // For demo purposes, we'll simulate a successful registration
      const userData = {
        id: 'user123',
        email,
        name,
      };
      
      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}