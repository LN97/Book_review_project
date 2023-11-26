// Create a context for managing routing and user state
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState( null );

  const login = (userData , returnBack ) => {
      let { username , password } = userData;
      console.log( username, password )
      axios.post('http://localhost:5000/api/users/login' , { username , password })
           .then(function (response) {
              console.log( response.data )
              if ( response.data.didLog ) {
              
                 console.log( 'logged')   
                 setUser({ user: response.data.res , isLogged: response.data.didLog });
                 returnBack();
              } else {
                console.log('didnt log')
                returnBack( response.data.didLog )
              }
           })
           .catch(function (error) {
            // handle error
            console.log(error.response.data );
           });
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
