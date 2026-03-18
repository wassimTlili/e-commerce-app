import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  // Simple static authentication (for demo purposes)
  const loginAdmin = (email, password) => {
    // Static credentials for demo: admin@shop.com / admin123
    if (email === 'admin@shop.com' && password === 'admin123') {
      setIsAdmin(true);
      setAdminEmail(email);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminEmail('');
  };

  return (
    <AuthContext.Provider value={{
      isAdmin,
      adminEmail,
      loginAdmin,
      logoutAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
