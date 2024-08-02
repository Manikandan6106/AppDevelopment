import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Sidebar.css';

const Sidebar = ({ isVisible, isUserHome }) => (
  <div className={`sidebar ${isVisible ? 'visible' : 'hidden'} ${isUserHome ? 'user-home' : 'admin-home'}`}>
    <ul>
      <li><Link to={isUserHome ? "/user" : "/admin"}>Home</Link></li>
      <li><Link to="/admin-notifications">Notifications</Link></li>
      <li><Link to="/admin-feedbacks">Feedbacks</Link></li>
      <li><Link to="/admin-reports">Reports</Link></li>
      {isUserHome && (
        <>
          <li><Link to="/request-maintenance">Request Maintenance</Link></li>
          <li><Link to="/report-issue">Report Issue</Link></li>
        </>
      )}
      <li><Link to="/">Logout</Link></li>
    </ul>
  </div>
);

export default Sidebar;
