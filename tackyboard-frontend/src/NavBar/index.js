import React from 'react';
import "./NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
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
    </div>
  )
}

export default NavBar;