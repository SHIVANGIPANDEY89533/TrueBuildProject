import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_PASSWORD = 'admin123';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // 👈 customer
  const [admin, setAdmin] = useState(false); // 👈 admin

  // restore session
  useEffect(() => {
    const savedUser = sessionStorage.getItem('gkd_user');
    const savedAdmin = sessionStorage.getItem('gkd_admin');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAdmin === 'true') setAdmin(true);
  }, []);

  // 👤 CUSTOMER LOGIN
  const loginUser = (name, email) => {
    const u = { name, email };
    setUser(u);
    sessionStorage.setItem('gkd_user', JSON.stringify(u));
  };

  // 🔐 ADMIN LOGIN
  const loginAdmin = (password) => {
    if (password === ADMIN_PASSWORD) {
      setAdmin(true);
      sessionStorage.setItem('gkd_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setAdmin(false);
    sessionStorage.removeItem('gkd_user');
    sessionStorage.removeItem('gkd_admin');
  };

  // ✅ 🔥 THIS WAS MISSING
  const isLoggedIn = !!user || admin;

  return (
    <AuthContext.Provider value={{
      user,
      admin,
      isLoggedIn,   // ✅ ADDED
      loginUser,
      loginAdmin,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);