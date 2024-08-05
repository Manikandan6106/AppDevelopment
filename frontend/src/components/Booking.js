import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/Booking.css';
import UserNavbar from './UserNavbar';

const Booking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateBooking();
    if (isValid) {
      // Simulate booking process
      navigate('/user/bookingconfirmation');
    }
  };

  const validateBooking = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (phone.length !== 10) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!address) {
      errors.address = 'Address is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="booking-page-container">
      <UserNavbar />
      <div className="booking-form-container">
        <h2 className="booking-title">Book Your Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="booking-input-field">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {errors.name && <div className="booking-error">{errors.name}</div>}
          </div>
          <div className="booking-input-field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && <div className="booking-error">{errors.email}</div>}
          </div>
          <div className="booking-input-field">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            {errors.phone && <div className="booking-error">{errors.phone}</div>}
          </div>
          <div className="booking-input-field">
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            {errors.address && <div className="booking-error">{errors.address}</div>}
          </div>
          <button type="submit" className="booking-btn">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
