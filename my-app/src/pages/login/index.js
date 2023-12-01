import React, { useState } from 'react';
import LoginForm from './login';
import SignUp from './register';

export default function LoginPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const showLoginForm = () => {
    setIsLoginForm(true);
  };

  const showSignUpForm = () => {
    setIsLoginForm(false);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
  };

  const buttonContainerStyle = {
    margin: '20px 0 20px 0', // Add margin between buttons
  };

  return (
    <div style={containerStyle}>
      <h1>Login Page</h1>
      <div style={buttonContainerStyle}>
        <button onClick={showLoginForm}>Login</button>
        <button onClick={showSignUpForm} style={{ marginLeft: '10px' }}>Sign Up</button>
      </div>
      {isLoginForm ? <LoginForm /> : <SignUp />}
    </div>
  );
}
