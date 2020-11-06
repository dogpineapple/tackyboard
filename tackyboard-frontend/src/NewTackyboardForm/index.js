import React, { useState } from "react";
// import "./NewTackyboardForm.css";
// import axios from "axios";

/**
 * NewTackyboardForm component renders the controlled form for creating a new task.
 */
function NewTackyboardForm() {
  const INITIAL_VALUES = {user_id: localStorage.getItem("user_id") , name: "" };
  const [formData, setFormData] = useState(INITIAL_VALUES);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(currData => ({ ...currData, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(`submitted`, formData);
    // const resp = await axios.post('http://localhost:5000/job-posts/new', formData);
    // console.log('response...', resp.data);
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