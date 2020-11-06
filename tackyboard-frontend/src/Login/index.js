import React from 'react';
import axios from 'axios';
import LoginForm from '../LoginForm';
import "./Login.css";
import { useHistory } from 'react-router-dom';

const loginUrl = "http://localhost:5000/login";

function Login({setLoggedIn}) {
  const history = useHistory();

  const handleLogin = async (data) => {
    localStorage.clear();
    let resp = await axios.post(loginUrl, data);
    console.log(resp.data);
    if (resp.data["_token"]) {

      let token = resp.data["_token"];
      let tokenParts = token.split(".");
      let userInfo = JSON.parse(atob(tokenParts[1]));
      localStorage.setItem("user_id", userInfo.user_id);
      localStorage.setItem("user_email", userInfo.email);
      localStorage.setItem("_token", resp.data["_token"]);

      setLoggedIn(true);
      history.push("/tackyboards");
    } else {
      console.log(resp.data["error"]);
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
      <LoginForm handleLogin={handleLogin}/>
    </div>
  )
}

export default Login;