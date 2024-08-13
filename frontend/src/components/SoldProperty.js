import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import '../styling/SoldProperty.css';

const SoldProperty = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [approvedBookings, setApprovedBookings] = useState([]);

  useEffect(() => {
    const fetchApprovedBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8080/api/bookings/approved', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApprovedBookings(data);
        } else {
          console.error('Failed to fetch approved bookings');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApprovedBookings();
  }, []);

  const deleteSoldProperty = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8080/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setApprovedBookings(approvedBookings.filter(booking => booking.id !== id));
        console.log('Deleted successfully');
      } else {
        console.error('Failed to delete the property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`sold-property-container ${sidebarVisible ? 'sidebar-open' : ''}`}>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isVisible={sidebarVisible} />
      <div className="sold-property-content">
        <h2 className="sold-property-heading">Sold Properties</h2>
        <table className="sold-property-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Property ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.address}</td>
                <td>{booking.propertyId}</td>
                <td>
                  <button 
                    className="delete-btn" 
                    onClick={() => deleteSoldProperty(booking.id)}
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

export default SoldProperty;
