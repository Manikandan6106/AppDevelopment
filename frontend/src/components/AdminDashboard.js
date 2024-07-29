import React from 'react';
import UserView from './UserView';
import EditUsers from './EditUsers';
import AddUsers from './AddUsers';
import DeleteUsers from './DeleteUsers';
import FeedBackadmindash from './FeedBackadmindash';
import ScheduleAdmin from './ScheduleAdmin';
import '../styling/AdminDashboard.css'; // Ensure this path is correct

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UserView />
      <EditUsers />
      <AddUsers />
      <DeleteUsers />
      <FeedBackadmindash />
      <ScheduleAdmin />
    </div>
  );
};

export default AdminDashboard;
