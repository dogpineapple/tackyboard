import React from 'react';
import SignUpForm from '../SignUpForm';
import "./SignUp.css";
import * as tackywabbyImg from "../images/tackywabby.png";

function SignUp() {

  return (
    <div className="SignUp">
      <div className="SignUp-background">
        <img src={tackywabbyImg} alt="tackywabby.png" />
      </div>
      <SignUpForm />
    </div>
  )
}

export default SignUp;