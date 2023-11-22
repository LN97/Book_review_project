// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context';

const Header = () => {    

    const { user , logout } = useAppContext();

    const pageUrls = [
        { link: '/' , name: 'home ' , protected: false , hideIfAuthed: true },
        { link: '/discover', name: 'discover' , protected: false },
        { link: 'collections', name: 'collections' , protected: true }
    ];

  return (
    <header>
      <nav>
        <ul>
            { pageUrls.map( ( pageUrl ) =>
                <li>
                     <Link to={ pageUrl.link }> { pageUrl.name }</Link>
                </li>
            )}
        </ul>
      </nav>

      <div>
              {
                user ? (
                  <div>
                     <h3> { user.username }  </h3> 
                     <div onClick={ () => logout() }> Logout </div>
                  </div>
                ) : (
                <Link to={'/login'}> Login </Link>
                )
              } 
      </div>
    </header>
  );
};

export default Header;