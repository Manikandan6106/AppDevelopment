import React, { useState } from 'react';
import '../styling/ReqMain.css'; // Ensure the path is correct
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar'; // Import UserNavbar component

const ReqMain = () => {
  const [propertyName, setPropertyName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [issue, setIssue] = useState('');
  const [details, setDetails] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/maintain/create",
        {
          propertyName: propertyName,
          address: address,
          phoneNumber: phoneNumber,
          issue: issue,
          details: details,
        }
      );

      if (response.status === 201) {
        toast.success("Maintenance request submitted successfully");
        setPropertyName('');
        setAddress('');
        setPhoneNumber('');
        setIssue('');
        setDetails('');

        // Wait for 3 seconds before navigating
        setTimeout(() => {
          navigate("/user");
        }, 3000);
      } else {
        toast.error("Failed to submit maintenance request");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the request");
    }
  };

  return (
    <div className="req-maintenance-container">
      <UserNavbar /> {/* Add UserNavbar here */}
      <form onSubmit={handleSubmit}>
        <h2>Request Maintenance</h2>
        <div className="form-group">
          <label htmlFor="propertyName">Property Name:</label>
          <input 
            type="text" 
            id="propertyName" 
            value={propertyName} 
            onChange={(e) => setPropertyName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input 
            type="text" 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input 
            type="tel" 
            id="phoneNumber" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="issue">Issue:</label>
          <textarea
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
            rows="3" // Adjust the number of rows for the textarea
          />
        </div>
        
        <button type="submit">Submit Request</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ReqMain;
