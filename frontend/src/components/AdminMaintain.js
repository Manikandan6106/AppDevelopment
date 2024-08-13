import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import '../styling/AdminMaintain.css';

const AdminMaintain = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch('http://127.0.0.1:8080/api/maintain/getAll', config);
        if (response.ok) {
          const data = await response.json();
          setMaintenanceRequests(data);
        } else {
          console.error('Failed to fetch maintenance requests');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`http://127.0.0.1:8080/api/maintain/${id}`, {
        method: 'DELETE',
        headers: config.headers,
      });
      if (response.ok) {
        setMaintenanceRequests(maintenanceRequests.filter(request => request.id !== id));
      } else {
        console.error('Failed to delete maintenance request');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <div className={`admin-maintain-container ${sidebarVisible ? 'sidebar-open' : ''}`}>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isVisible={sidebarVisible} />
      <div className="admin-maintain-content">
        <h2 className="admin-maintain-heading">Maintenance Requests</h2>
        <table className="admin-maintain-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Property Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Issue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.propertyName}</td>
                <td>{request.address}</td>
                <td>{request.phoneNumber}</td>
                <td>{request.issue}</td>
                <td>
                  <button className="admin-maintain-assist-btn">Assist</button>
                  <button
                    className="admin-maintain-delete-btn"
                    onClick={() => handleDelete(request.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMaintain;
