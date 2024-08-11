import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './Navbar';
import '../styling/Login.css';  // Keep your existing CSS file here
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const apiurl = "http://localhost:8080/api/auth/authenticate";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = {};
    if (formData.email.trim() === '') {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Invalid email address';
    }
    if (formData.password.trim() === '') {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(apiurl, formData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        const role = localStorage.getItem("role");
        toast.success('Logged in successfully!');
        setTimeout(() => {
          if (role === "ADMIN") {
            navigate('/admin');
          } else {
            navigate('/user');
          }
        }, 1500); 
      } catch (error) {
        console.error(error);
        toast.error('Invalid email or password');
      }
    }
  };

  return (
    <div className="login-container">
      <NavigationBar />
      <div className="login-form">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
