import React, { useState } from 'react';
import '../styling/Login.css'; // Assuming you have similar styling as Login

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateLogin();
    if (isValid) {
      // Handle admin login
    }
  };

  const validateLogin = () => {
    const errors = {};
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
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="title">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="input-field">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
