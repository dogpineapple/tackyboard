import React from "react";
import "./TaskDetail.css";
import TackyCard from "../TackyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * Props: task (object: { title, description, status, tackycards })
 */
function TaskDetail({ task }) {
  return (
    <div className="TaskDetail">
      <h1 className="TaskDetail-title">{task.title}</h1>
      <div className="TaskDetail-icon-btn tooltip" >
        <FontAwesomeIcon  icon={faTrash} size="3x"/>
        <span className="tooltiptext">Remove task</span>  
      </div>
      <div className="TaskDetail-icon-btn tooltip" >
        <FontAwesomeIcon  icon={faEdit} size="3x"/>
        <span className="tooltiptext">Edit task</span>  
      </div>
      <div className="TaskDetail-icon-btn tooltip" >
        <FontAwesomeIcon  icon={faStickyNote} size="3x"/>
        <span className="tooltiptext">New tackynote</span>  
      </div>
      <p className="TaskDetail-description">
        {task.description}
        <span className="TaskDetail-status tooltip">
          {task.status.toUpperCase()}
          <span className="TaskListCard-tooltiptext tooltiptext">Change</span>
        </span>
      </p>
      {
        task.tackycards?.length > 0 && task.tackycards?.map(card => (
          <TackyCard key={card.id} title={card.title} body={card.body} />
        ))
      }
    </div>
  );
}

export default TaskDetail;