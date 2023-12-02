import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider, useAppContext } from './context';


// === PAGE IMPORTS === //#


import './styles.css'

import DiscoverPage from './pages/discover/index';
import LoginPage from './pages/login/index';
import HomePage from './pages/landing/index';
import BookPage from './pages/book/index';
import CollectionsPage from './pages/collections/index';

import Layout from './layout/layout';
import {
    BrowserRouter,
    Route,
    Routes,
    redirect
  } from "react-router-dom";
  

  // const ProtectedRoute = ({ element: Element, ...rest }) => {
  //   let { user } = useAppContext();
  
  //   return (
  //     <Route
  //       {...rest}
  //       element={(props) =>
  //         user.didLog ? <Element {...props} /> : <red to="/login" />
  //       }
  //     />
  //   );
  // };


  function Pages () {
    return (
      <BrowserRouter>
          <AppProvider>
              <Layout > 
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path="/savedbooks" element={ <CollectionsPage /> } />
                    <Route path="/discover" element={ <DiscoverPage /> } />
                    <Route path="/book/:bookid*" element={<BookPage /> } />
                  </Routes>
              </Layout>
          </AppProvider>
      </BrowserRouter>
    );
  }
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Pages />
);
