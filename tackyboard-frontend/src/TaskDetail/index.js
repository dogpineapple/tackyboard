import React, { useState } from "react";
import "./TaskDetail.css";
import TackyCard from "../TackyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import NewTackynoteForm from "../NewTackynoteForm";

/**
 * 
 * Props: task (object: { title, description, status, tackycards })
 */
function TaskDetail({ taskDetail, setTaskDetail }) {
  const [showForm, setShowForm] = useState(false);

  const statuses = {
    0: "PLANNED",
    1: "IN PROGRESS",
    2: "DONE",
    3: "DROPPED",
    4: "PENDING",
  }

  const updateTaskDetail = (newNote) => {
    setTaskDetail(currData => ({ ...currData, tackynotes: [newNote.tackynote, ...currData.tackynotes] }));
  }

  const handleShowForm = () => {
    setShowForm(true);
  }

  return (
    <div className="TaskDetail">
      {showForm && <NewTackynoteForm setShowForm={setShowForm} updateTaskDetail={updateTaskDetail} taskId={taskDetail.task.task_id} />}
      <h1 className="TaskDetail-title">{taskDetail.task.task_title}</h1>
      <div className="TaskDetail-icon-btn tooltip" >
        <FontAwesomeIcon icon={faTrash} size="3x" />
        <span className="tooltiptext">Remove task</span>
      </div>
      <div className="TaskDetail-icon-btn tooltip" >
        <FontAwesomeIcon icon={faEdit} size="3x" />
        <span className="tooltiptext">Edit task</span>
      </div>
      <div className="TaskDetail-icon-btn tooltip" >
        <FontAwesomeIcon icon={faStickyNote} size="3x" onClick={handleShowForm}/>
        <span className="tooltiptext">New tackynote</span>
      </div>
      <p className="TaskDetail-description">
        {taskDetail.task.task_description}
        <span className="TaskDetail-status tooltip">
          {statuses[taskDetail.task.status_id]}
          <span className="TaskListCard-tooltiptext tooltiptext">Change</span>
        </span>
      </p>
      {
        taskDetail.tackynotes?.length > 0 && taskDetail.tackynotes?.map(card => (
          <TackyCard key={card.tackynote_id} title={card.note_title} body={card.note} />
        ))
      }
    </div>
  );
}

export default TaskDetail;