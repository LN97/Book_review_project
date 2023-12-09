// Create a context for managing routing and user state
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = (userData , returnBack ) => {
      let { username , password } = userData;
      console.log( username, password )
      axios.post(`${process.env.REACT_APP_ENDPOINT}/api/users/login` , { username , password })
           .then(function (response) {

              let data = response.data;

              console.log( data );

              if ( data.didLog ) {
                 console.log( 'logged' ,data .user )   
                 setUser({ user: data.res , isLogged: data.didLog });
                 returnBack( data );
              } else {
                console.log('didnt log')
                returnBack( data )
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
    logout,
    setUser
  };

  return (
    <AppContext.Provider value={ states }>
      {children}
    </AppContext.Provider>
  );
};
