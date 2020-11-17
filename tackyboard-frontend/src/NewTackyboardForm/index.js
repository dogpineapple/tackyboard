import React, { useState } from "react";
// import "./NewTackyboardForm.css";
import axios from "axios";

const addTackyboardUrl = "http://localhost:5000/tackyboards";

/**
 * NewTackyboardForm component renders the controlled form for creating a new task.
 */
function NewTackyboardForm({ setShowForm, setTaskboards }) {
  const INITIAL_VALUES = { _token: localStorage.getItem("_token"), name: "" };
  const [formData, setFormData] = useState(INITIAL_VALUES);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(currData => ({ ...currData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const resp = await axios.post(addTackyboardUrl, formData);
    setShowForm(false);
    setTaskboards(currData => [...currData, resp.data.tackyboard]);
  }

  //LOW PRIORITY TODO: consider making a character count in the form inputs.
  return (
    <form className="NewTackyboardForm" onSubmit={handleSubmit}>
      <input maxlength="50" placeholder="Tackyboard name" name="name" value={formData.name} onChange={handleChange} />
      <button type="submit">Create Tackyboard!</button>
    </form>
  );
}

export default NewTackyboardForm;