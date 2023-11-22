// Create a context for managing routing and user state
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState( null );

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const states = {
    user,
    login,
    logout
  };

  return (
    <AppContext.Provider value={ states }>
      {children}
    </AppContext.Provider>
  );
};
