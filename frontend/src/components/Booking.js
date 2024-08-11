import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styling/Booking.css';
import UserNavbar from './UserNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const location = useLocation();
  const [propertyId, setPropertyId] = useState(location.state?.propertyId || null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateBooking();
    if (isValid) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8080/api/bookings/create",
                { name, email, phone, address, propertyId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Response:', response); // Log the response for debugging

            // Adjusted status check to include 201 Created
            if (response.status === 201) {
                toast.success("Booking submitted successfully");
                setName('');
                setEmail('');
                setPhone('');
                setAddress('');

                setTimeout(() => {
                    navigate("/user");
                }, 3000); // 3 seconds
            } else {
                toast.error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error); // Log error for debugging
            if (error.response) {
                toast.error(`An error occurred: ${error.response.data.message || error.response.statusText}`);
            } else {
                toast.error(`An error occurred: ${error.message}`);
            }
        }
    }
};



  const validateBooking = () => {
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email address';
    if (!phone) errors.phone = 'Phone number is required';
    else if (phone.length !== 10) errors.phone = 'Phone number must be 10 digits';
    if (!address) errors.address = 'Address is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

   

  return (
    <div className="booking-page-container">
      <UserNavbar />
      <div className="booking-form-container">
        <h2 className="booking-title">Book Your Property</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          {/* Form fields */}
          <div className="booking-input-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="booking-error">{errors.name}</div>}
          </div>
          <div className="booking-input-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="booking-error">{errors.email}</div>}
          </div>
          <div className="booking-input-field">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <div className="booking-error">{errors.phone}</div>}
          </div>
          <div className="booking-input-field">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <div className="booking-error">{errors.address}</div>}
          </div>
          <button type="submit" className="booking-btn">Submit Booking</button>
         </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Booking;
