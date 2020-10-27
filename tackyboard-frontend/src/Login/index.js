import React from 'react';
import LoginForm from '../LoginForm';
import "./Login.css";

function Login() {

  return (
    <div className="Login">
      <div className="Login-bg">
        <div className="Login-square floating"></div>
        <div className="Login-circle floating-reverse"></div>
        <div className="Login-circle2 floating"></div>
        <div className="Login-circle3 floating-reverse"></div>
      </div>
      <LoginForm />
    </div>
  )
}

export default Login;