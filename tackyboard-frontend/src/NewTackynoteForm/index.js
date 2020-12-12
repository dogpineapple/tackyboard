import Axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./NewTackynoteForm.scss";

const BASE_URL = "http://localhost:5000";
/**
 * NewTackynoteForm component renders the controlled form for creating a new task.
 */
function NewTackynoteForm({ setShowForm, updateTaskDetail, taskId }) {
  const INITIAL_VALUES = { note_title: "", note: "" };
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const { boardId } = useParams();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(currData => ({ ...currData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await Axios.post(`${BASE_URL}/tackyboard/${boardId}/tasks/${taskId}/tackynotes`, formData, {withCredentials: true});
    setShowForm(false);
    setFormData(INITIAL_VALUES);
    updateTaskDetail(res.data);
  }

  //LOW PRIORITY TODO: consider making a character count in the form inputs.
  return (
    <div className="NewTackynoteForm-container">
    <form className="NewTackynoteForm" onSubmit={handleSubmit}>
      <h3>Add Tackynote</h3>
      <input required maxLength="50" placeholder="Note title" name="note_title" value={formData.note_title} onChange={handleChange} />
      <textarea maxLength="500" placeholder="Note" name="note" value={formData.note} onChange={handleChange} />
      <button type="submit">Note it!</button>
    </form>
    </div>
  );
}

export default NewTackynoteForm;