import React from "react";
import "./TaskDetail.css";
import TackyCard from "../TackyCard";

/**
 * 
 * Props: task (object: { title, description, status, tackycards })
 */
function TaskDetail({ task }) {
  return (
    <div className="TaskDetail">
      <h1 className="TaskDetail-title">{task.title}</h1>
      <p className="TaskDetail-description">{task.description}</p>
      <p className="TaskDetail-status tooltip">{task.status.toUpperCase()}<span className="TaskListCard-tooltiptext tooltiptext">Change</span></p>
      {
        task.tackycards?.length > 0 && task.tackycards?.map(card => (
          <TackyCard key={card.id} title={card.title} body={card.body} />
        ))
      }
    </div>
  );
}

export default TaskDetail;