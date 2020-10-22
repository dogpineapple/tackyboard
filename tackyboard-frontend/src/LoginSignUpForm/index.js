import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
  const INITIAL_VALUES = { email: "", password: "" };
  const [formData, setFormData] = useState(INITIAL_VALUES);
  
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(currData => ({ ...currData, [name]: value }));
  };
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const resp = await axios.post('http://localhost:5000/login', formData);
  }

  return (
    <div className="LoginForm">
      <h1>TACKYBOARD LOGIN</h1>
      <p className="LoginForm-signup">No account? <a href="/sign-up">Sign Up</a></p>
      <form onSubmit={handleSubmit}>
        <input name="email" value={formData.email} placeholder="Email" onChange={handleChange}/>
        <input name="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
        <button>LOGIN</button>
      </form>
    </div>
  )
}

export default LoginForm;