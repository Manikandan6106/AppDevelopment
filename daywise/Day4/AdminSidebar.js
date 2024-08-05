import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/AdminSidebar.css';

const AdminSidebar = ({ isVisible }) => (
  <div className={`admin-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
    <ul>
      <li><Link to="/admin">Home</Link></li>
      <li><Link to="/admin-maintenance">Maintenance</Link></li>
      <li><Link to="/admin-sold-properties">Sold Properties</Link></li>
      <li><Link to="/admin-feedbacks">Feedbacks</Link></li>
      <li><Link to="/">Logout</Link></li>
    </ul>
  </div>
);

export default AdminSidebar;
