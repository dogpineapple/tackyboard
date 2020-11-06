import React from 'react';
import "./TackyCard.scss";

function TackyCard({ title, body}) {
  return (
    <div className="TackyCard">
      <h1 className="TackyCard-title">{title}</h1>
      <p className="TackyCard-body">{body}</p>
    </div>
  )
}

export default TackyCard;