import React, { useState } from "react";
import axios from "axios";

/**
 * NewTaskForm component renders the controlled form for 
 * creating a new job post.
 */
function NewTaskForm() {
  const INITIAL_VALUES = { taskname: "", description: "", status: "", deadline: "", csrf_token: "" };
  const [formData, setFormData] = useState(INITIAL_VALUES);
  /*
  "post_url": "https://www.google.com/",
	"company": "google",
	"position": "CEO",
	"origin_name": "AngelList",
	"job_description": "Yes",
	"scrape": "false"
  */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(currData => ({ ...currData, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(`submitted`, formData);
    const resp = await axios.post('http://localhost:5000/job-posts/new', formData);
    console.log('response...', resp.data);
  }

  return (
    <form className="NewTaskForm" onSubmit={handleSubmit}>
      <input placeholder="Taskname" name="taskname" value={formData.taskname} onChange={handleChange} />
      <input placeholder="Description" name="description" value={formData.description} onChange={handleChange} />
      <select name="status" id="status">
        <option value="1">Planned</option>
        <option value="2">In Progress</option>
        <option value="3">Finished</option>
      </select>
      <input placeholder="Deadline" name="deadline" value={formData.deadline} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewTaskForm;