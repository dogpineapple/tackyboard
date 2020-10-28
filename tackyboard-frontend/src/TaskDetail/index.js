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
      <span className="TaskDetail-status">{task.status}</span>
      {
        task.tackycards?.length > 0 && task.tackycards?.map(card => (
          <TackyCard key={card.id} title={card.title} body={card.body} />
        ))
      }
    </div>
  );
}

export default TaskDetail;