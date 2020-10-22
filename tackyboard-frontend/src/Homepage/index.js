import React from 'react';
import * as tackyboard_img from '../images/tackyboard.png';
import './Homepage.css';

function Homepage() {
  return (
    <div className="Homepage">
      <div className="Homepage-statement">
        <h4>Card-based organizer.</h4>
        <h1>Tackyboard</h1>
        <p>Keep track of tasks, plans, events, and more!</p>
      </div>
      <div className="Homepage-img-container">
        <img src={tackyboard_img} alt="tackyboard_image" />
      </div>
    </div>
  )
}

export default Homepage;