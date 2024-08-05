import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/UserSidebar.css';

const UserSidebar = ({ isVisible }) => (
  <div className={`user-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
    <ul>
      <li><Link to="/user">Home</Link></li>
      <li><Link to="/user/ReqMain">Request Maintenance</Link></li>
      <li><Link to="/user/feedback">Feedbacks</Link></li>
      <li><Link to="/">Logout</Link></li>
    </ul>
  </div>
);

export default UserSidebar;
