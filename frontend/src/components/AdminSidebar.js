import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/AdminSidebar.css';

const AdminSidebar = ({ isVisible }) => (
  <div className={`admin-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
    <ul>
      <li><Link to="/admin">Home</Link></li>
      <li><Link to="/admin-contact">Notifications</Link></li> {/* Added link */}
      <li><Link to="/admin-maintenance">Maintenance Requests</Link></li>
      <li><Link to="/admin-bookings">Booked Properties</Link></li>
      <li><Link to="/admin-feedbacks">User Feedbacks</Link></li>
      <li><Link to="/">Logout</Link></li>
    </ul>
  </div>
);

export default AdminSidebar;
