import React, { useState } from 'react';
import '../styling/ReqMain.css'; // Ensure the path is correct

const ReqMain = () => {
  const [propertyName, setPropertyName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [issue, setIssue] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log('Property Name:', propertyName);
    console.log('Address:', address);
    console.log('Phone Number:', phoneNumber);
    console.log('Issue:', issue);
    console.log('Details:', details);
    // Example: send the data to an API
  };

  return (
    <div className="req-maintenance-container">
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
          <input 
            type="text" 
            id="issue" 
            value={issue} 
            onChange={(e) => setIssue(e.target.value)} 
            required 
          />
        </div>
         
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default ReqMain;
