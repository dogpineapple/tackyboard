import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * JobPostForm component renders the controlled form for 
 * creating a new job post.
 */
function JobPostForm() {
  const INITIAL_VALUES = { post_url: "", company: "", position: "", origin_name: "", job_description: "", scrape: false, csrf_token: "" };
  const [formData, setFormData] = useState(INITIAL_VALUES);
  /*
  "post_url": "https://www.google.com/",
	"company": "google",
	"position": "CEO",
	"origin_name": "AngelList",
	"job_description": "Yes",
	"scrape": "false"
  */

  // useEffect for the csrf token for the form.
  useEffect(function handleCSRFToken() {
    async function getCSRFToken() {
      const resp = await axios.get('http://localhost:5000/job-posts/new');
      setFormData(currData => ({ ...currData, csrf_token: resp.data.csrf_token}))
    }
    getCSRFToken();
  }, []);
  
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
    <form className="JobPostForm" onSubmit={handleSubmit}>
      <input placeholder="Post URL" name="post_url" value={formData.post_url} onChange={handleChange} />
      <input placeholder="Company" name="company" value={formData.company} onChange={handleChange} />
      <input placeholder="Position" name="position" value={formData.position} onChange={handleChange} />
      <input placeholder="Post Origin" name="origin_name" value={formData.origin_name} onChange={handleChange} />
      <input placeholder="Job Description" name="job_description" value={formData.job_description} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default JobPostForm;