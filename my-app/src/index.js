import React from 'react';
import ReactDOM from 'react-dom/client';

// === PAGE IMPORTS === //
import DiscoverPage from './pages/discover/index';
import LoginPage from './pages/login/index';
import HomePage from './pages/landing/index';
import BookPage from './pages/book/index';
import CollectionsPage from './pages/collections/index';

import {
    BrowserRouter,
    Route,
    Routes,
  } from "react-router-dom";
  
  function Pages () {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/collections" element={ <CollectionsPage /> } />
          <Route path="/discover" element={ <DiscoverPage /> } />
          <Route path="/book/:bookid*" element={<BookPage /> } />
        </Routes>
      </BrowserRouter>
    );
  }
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Pages />
);
