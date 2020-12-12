import React, { useState } from "react";
import "./TaskDetail.css";
import TackyCard from "../TackyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote, faTrash } from "@fortawesome/free-solid-svg-icons";
import NewTackynoteForm from "../NewTackynoteForm";
import { statuses } from "../helpers";

/**
 * 
 * Props: task (object: { title, description, status, tackycards })
 */
function TaskDetail({ taskDetail, setTaskDetail, deleteTask, editTask }) {
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({ task_title: taskDetail.task.task_title, task_description: taskDetail.task.task_description })

  const updateTaskDetail = (newNote) => {
    setTaskDetail(currData => ({ ...currData, tackynotes: [newNote.tackynote, ...currData.tackynotes] }));
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setEditData(currData => ({ ...currData, [name]: value }));
  }

  const handleEditSubmit = (evt) => {
    evt.preventDefault();
    if (editData.task_title !== taskDetail.task.task_title
          && editData.task_description !== taskDetail.task.task_description) {
      editTask(taskDetail.task.task_id, editData);
    }
    setShowEdit(false);
  }

  const handleShowForm = () => {
    setShowForm(!showForm);
  }

  const handleDeleteTask = () => {
    deleteTask(taskDetail.task.task_id);
  }

  return (
    <div className="TaskDetail">
      {showForm && <NewTackynoteForm setShowForm={setShowForm} updateTaskDetail={updateTaskDetail} taskId={taskDetail.task.task_id} />}
      <h1 className="TaskDetail-title" onClick={() => setShowEdit(true)}>
        {showEdit ?
          <form onSubmit={handleEditSubmit}>
            <input value={editData.task_title} name="task_title" onChange={handleChange}></input>
          </form>
          : taskDetail.task.task_title}</h1>
      <aside>
        <div className="TaskDetail-icon-btn tooltip" >
          <FontAwesomeIcon icon={faTrash} size="3x" onClick={handleDeleteTask} />
          <span className="tooltiptext">Remove task</span>
        </div>
        <div className="TaskDetail-icon-btn tooltip" >
          <FontAwesomeIcon icon={faStickyNote} size="3x" onClick={handleShowForm} />
          <span className="tooltiptext">New tackynote</span>
        </div>
      </aside>
      <p className="TaskDetail-description">
        {showEdit ?
          <form onSubmit={handleEditSubmit}>
            <input value={editData.task_description} name="task_description" onChange={handleChange}></input>
          </form>
          : taskDetail.task.task_description}
        <span className="TaskDetail-status tooltip" style={{ backgroundColor: statuses[taskDetail.task.status_id].color }}>
          {statuses[taskDetail.task.status_id].status}
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