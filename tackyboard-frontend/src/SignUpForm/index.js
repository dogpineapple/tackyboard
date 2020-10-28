import React, { useState } from "react";
// import axios from 'axios';
import './SignUpForm.css';

function SignUpForm() {
  const INITIAL_VALUES = { email: "", password: "", repeatPassword: "", fname: "", lname: "" };
  const [formData, setFormData] = useState(INITIAL_VALUES);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(currData => ({ ...currData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // const resp = await axios.post('http://localhost:5000/register', formData);
  }

  return (
    <div className="SignUpForm">
      <h1>Register for Tackyboard!</h1>
      <p className="SignUpForm-login">Already have an account? <a href="/login">Login</a></p>
      <form onSubmit={handleSubmit}>
        <input name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
        <input name="password" value={formData.password} placeholder="Password" onChange={handleChange} />
        <input name="repeatPassword" value={formData.repeatPassword} placeholder="Password" onChange={handleChange} />
        <input name="fname" value={formData.fname} placeholder="Firstname" onChange={handleChange}></input>
        <input name="lname" value={formData.lname} placeholder="Lastname" onChange={handleChange}></input>
        <button>SIGN UP</button>
      </form>
    </div>
  )
}

export default SignUpForm;