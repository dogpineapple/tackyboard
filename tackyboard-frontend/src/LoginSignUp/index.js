import React from 'react';
import LoginForm from '../LoginSignUpForm';
import "./LoginSignUp.css";

function LoginSignUp() {

  return (
    <div className="LoginSignUp">
      <div className="LoginSignUp-bg">
        <div className="LoginSignUp-square floating"></div>
        <div className="LoginSignUp-circle floating-reverse"></div>
        <div className="LoginSignUp-circle2 floating"></div>
        <div className="LoginSignUp-circle3 floating-reverse"></div>
      </div>
      <LoginForm />
    </div>
  )
}

export default LoginSignUp;