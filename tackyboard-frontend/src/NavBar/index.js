import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import "./NavBar.css";

function NavBar({ isLoggedIn, setLoggedIn }) {
  const history = useHistory();

  // handleLogout is placed here because `useHistory` can only be used within `BrowserRouter`
  const handleLogout = async () => {
    
    const resp = await axios.get("http://localhost:5000/logout", {withCredentials: true});
    if (resp.status === 200) {
      setLoggedIn(false);
      localStorage.clear();
      // dispatch set redux state to INITIAL
      history.push("/");
    }
  }

  return (
    <div className="NavBar">
      {
        isLoggedIn ?
          <ul className="NavBar-list">
            <li className="NavBar-item">
              <a href="/tackyboards">TACKYBOARDS</a>
            </li>
            {/* <li className="NavBar-item">
              <a href={`/users/${localStorage.getItem("user_id")}`}>SETTINGS</a>
            </li> */}
            <li className="NavBar-item">
              <span className="NavBar-item" onClick={handleLogout}>LOGOUT</span>
            </li>
          </ul>
          :
          <ul className="NavBar-list">
            <li className="NavBar-item">
              <a href="/">TACKYBOARD</a>
            </li>
            <li className="NavBar-item">
              <a href="/demo">DEMO</a>
            </li>
            <li className="NavBar-item">
              <a href="/login">LOGIN</a>
            </li>
          </ul>
      }
    </div>
  );
}

export default NavBar;