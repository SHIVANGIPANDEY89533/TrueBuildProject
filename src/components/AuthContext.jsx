import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,  setUser]  = useState(null);  // { name, email, role: 'user' }
  const [admin, setAdmin] = useState(false); // true if admin logged in

  // Persist login across refresh
  useEffect(() => {
    try {
      const savedUser  = localStorage.getItem('gkd_user');
      const savedAdmin = localStorage.getItem('gkd_admin');
      if (savedUser)  setUser(JSON.parse(savedUser));
      if (savedAdmin === 'true') setAdmin(true);
    } catch {}
  }, []);

  const loginUser = (name, email) => {
    const u = { name, email, role: 'user' };
    setUser(u);
    localStorage.setItem('gkd_user', JSON.stringify(u));
  };

  const loginAdmin = () => {
    setAdmin(true);
    localStorage.setItem('gkd_admin', 'true');
  };

  const logout = () => {
    setUser(null);
    setAdmin(false);
    localStorage.removeItem('gkd_user');
    localStorage.removeItem('gkd_admin');
  };

  const isLoggedIn = !!user || admin;

  return (
    <AuthContext.Provider value={{
      user, admin, isLoggedIn,
      loginUser, loginAdmin, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);