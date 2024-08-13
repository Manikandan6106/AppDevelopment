import React, { useState } from 'react';
import '../styling/Signup.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateSignup()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/users/create",
        {
          id: 0,
          name: name,
          email: email,
          password: password,
          roles: "USER",
        }
      );

      if (response.status === 201) {
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 4000); // Redirect after 4 seconds
      } else {
        toast.error("User creation failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during user creation");
    }
  }

  const validateSignup = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    } else if (name.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <div className="signup-container">
      <Navbar />
      <div className="signup-form">
        <h2 className="title">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="input-field">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="input-field">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>
          <button type="submit" className="btn">Sign up</button>
          <p>Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
