import React from 'react';
import "./TackyCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"

function TackyCard({ title, body, noteId, handleDeleteTackynote }) {

  return (
    <div className="TackyCard">
      <div className="Tackycard-delete-btn" onClick={() => handleDeleteTackynote(noteId)}>
        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
      </div>
      <h1 className="TackyCard-title">{title}</h1>
      <p className="TackyCard-body">{body}</p>
    </div>
  )
}

export default TackyCard;