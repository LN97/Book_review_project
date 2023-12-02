// Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context';
import './styles.css'; // Import your CSS file for styling

const Header = () => {
  const { user, logout } = useAppContext();

  const navigate = useNavigate();

  const pageUrls = [
    { link: '/', name: 'home', protected: false, hideIfAuthed: true },
    { link: '/discover', name: 'discover', protected: false },
    { link: '/savedbooks', name: 'saved books', protected: true },
  ];

  const logoutUser = ( ) => {
     logout();
     navigate('/login');
  }

  return (
    <header>
      <nav>
        <ul>
          {pageUrls.map((pageUrl, index) => (
            // Check if the link should be displayed based on conditions
            !((pageUrl.protected && !user) || (pageUrl.hideIfAuthed && user)) && (
              <li key={index}>
                <Link to={pageUrl.link}>{pageUrl.name}</Link>
              </li>
            )
          ))}
        </ul>
      </nav>

      <div className="user-info">
        {user ? (
          <div>
            <h3>{user.user.username}</h3>
            <div className="logout-button" onClick={() => logoutUser()}>
              Logout
            </div>
          </div>
        ) : (
          <Link to={'/login'}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
