import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../LoginForm';
import "./Login.scss";
import { useHistory } from 'react-router-dom';

const loginUrl = "http://localhost:5000/login";

function Login({ setLoggedIn }) {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  
  const handleLogin = async (data) => {
    localStorage.clear();
    try {
      let resp = await axios.post(loginUrl, data, { withCredentials: true });
      let userData = resp.data;
      localStorage.setItem("email", userData.email);
      localStorage.setItem("user_id", userData.user_id);

      setLoggedIn(true);
      history.push("/tackyboards");
    } catch (err) {
      setErrors(["E-mail and password does not match."])
    }

  }

  return (
    <div className="Login">
      <div className="Login-bg">
        <div className="Login-square floating"></div>
        <div className="Login-circle floating-reverse"></div>
        <div className="Login-circle2 floating"></div>
        <div className="Login-circle3 floating-reverse"></div>
      </div>
      <div className="Login-form-container">
      {errors.length > 0 && errors.map(err => <div key={err} className="Login-error">{err}</div>)}
      <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  )
}

export default Login;