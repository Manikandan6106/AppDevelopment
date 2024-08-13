import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import '../styling/AdminMaintain.css'; // Reuse AdminMaintain styling for consistency

const AdminFeedback = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

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
        const response = await fetch('http://127.0.0.1:8080/api/feedback/getAll', config);
        if (response.ok) {
          const data = await response.json();
          setFeedbacks(data);
        } else {
          console.error('Failed to fetch feedbacks');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8080/api/feedback/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
        console.log('Deleted successfully');
      } else {
        console.error('Failed to delete the feedback');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`admin-maintain-container ${sidebarVisible ? 'sidebar-open' : ''}`}>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isVisible={sidebarVisible} />
      <div className="admin-maintain-content">
        <h2 className="admin-maintain-heading">Feedbacks</h2>
        <table className="admin-maintain-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.phone}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.review}</td>
                <td>
                  <button 
                    className="delete-btn" 
                    onClick={() => deleteFeedback(feedback.id)}
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

export default AdminFeedback;
