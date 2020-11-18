import React, { useState } from "react";
import "./NewTaskForm.css";
// import axios from "axios";

/**
 * NewTaskForm component renders the controlled form for creating a new task.
 */
function NewTaskForm({ addTask }) {
  const INITIAL_VALUES = { task_title: "", task_description: "", status_id: "0", deadline: "", csrf_token: "" };
  const [formData, setFormData] = useState(INITIAL_VALUES);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(currData => ({ ...currData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    addTask(formData);
  }
  
  //LOW PRIORITY TODO: consider making a character count in the form inputs.
  return (
    <form className="NewTaskForm" onSubmit={handleSubmit}>
      <input maxLength="75" placeholder="task_title" name="task_title" value={formData.task_title} onChange={handleChange} />
      <textarea maxLength="200" placeholder="task_description" name="task_description" value={formData.task_description} onChange={handleChange} />
      <select name="status_id" id="status_id" defaultValue="0" onChange={handleChange}>
        <option value="0">Planned</option>
        <option value="1">In Progress</option>
        <option value="2">Done</option>
        <option value="3">Dropped</option>
        <option value="4">Pending</option>
      </select>
      <input type="date" placeholder="Deadline" name="deadline" value={formData.deadline} onChange={handleChange} />
      <button type="submit">Add New Task</button>
    </form>
  );
}

export default NewTaskForm;