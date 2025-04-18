import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // verificam daca exista un utilizator salvat in localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // func pentru login
  const login = (userData) => {
    // in realitate, aici ar fi logica de verificare cu backend-ul
    const userWithDefaults = {
      ...userData,
      role: userData.role || 'student', // Rolul implicit este student
      avatarUrl: userData.avatarUrl || null,
      displayName: userData.displayName || userData.name,
      createdAt: userData.createdAt || new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(userWithDefaults));
    localStorage.setItem('token', 'demo-token');
    setCurrentUser(userWithDefaults);
    return userWithDefaults;
  };

  // func pentru logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  // func pentru a actualiza profilul utilizatorului
  const updateProfile = (updatedData) => {
    const updatedUser = { ...currentUser, ...updatedData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  // verif. daca utilizatorul are un anumit rol
  const hasRole = (role) => {
    if (!currentUser) return false;
    if (Array.isArray(role)) {
      return role.includes(currentUser.role);
    }
    return currentUser.role === role;
  };

  const value = {
    currentUser,
    login,
    logout,
    updateProfile,
    hasRole,
    isAdmin: currentUser?.role === 'admin',
    isTeacher: currentUser?.role === 'teacher',
    isStudent: currentUser?.role === 'student'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};