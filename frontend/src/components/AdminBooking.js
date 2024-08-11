// AdminBooking.js

import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import '../styling/AdminBooking.css';

const AdminBooking = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8080/api/bookings/getAll', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filter out approved bookings
          const unapprovedBookings = data.filter(booking => !booking.approved);
          setBookings(unapprovedBookings);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBookings();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const bookingToUpdate = bookings.find(booking => booking.id === id);

      const response = await fetch(`http://127.0.0.1:8080/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...bookingToUpdate, approved: true }),
      });

      if (response.ok) {
        // Remove the approved booking from the local state
        setBookings(bookings.filter(booking => booking.id !== id));
      } else {
        console.error('Failed to approve booking. Status:', response.status);
      }
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8080/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Remove the declined booking from the local state
        setBookings(bookings.filter(booking => booking.id !== id));
      } else {
        console.error('Failed to decline booking');
      }
    } catch (error) {
      console.error('Error declining booking:', error);
    }
  };

  return (
    <div className={`admin-booking-container ${sidebarVisible ? 'sidebar-open' : ''}`}>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isVisible={sidebarVisible} />
      <div className="admin-booking-content">
        <h2 className="admin-booking-heading">Bookings</h2>
        <table className="admin-booking-table">
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
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.address}</td>
                <td>{booking.propertyId}</td>
                <td>
                  {!booking.approved && (
                    <div className="button-container">
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(booking.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="decline-btn"
                        onClick={() => handleDecline(booking.id)}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBooking;
