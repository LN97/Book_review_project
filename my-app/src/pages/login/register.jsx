import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from'axios';
import { useAppContext} from '../../context';


const formStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  form: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '300px',
    width: '100%',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    margin: '10px 0',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default function SignUp() {
  
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Perform sign-up logic here, e.g., send a request to your server
    // For demonstration purposes, let's just log the username and password
    console.log(username, password );
    axios.post('http://localhost:5000/api/users/register' , { username , password })
    .then(function (response) {
       console.log( response.data )
       if ( response.data.didLog ) {
          console.log( 'logged')   
          setUser({ user: response.data.res , isLogged: response.data.didLog });
          navigate('/collections');
       } else {
         console.log('didnt log')
       }
    })
    .catch(function (error) {
     // handle error
     console.log(error.response.data );
    });
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.form}>
        <h2>Sign Up</h2>
        <div>
          <label htmlFor="username" style={formStyles.label}>
            Username:
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={formStyles.input}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password" style={formStyles.label}>
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={formStyles.input}
            />
          </label>
        </div>
        <button onClick={handleSignUp} style={formStyles.button}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
