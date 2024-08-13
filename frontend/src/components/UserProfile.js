import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/UserProfile.css'; // Import the CSS file

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [editingUser, setEditingUser] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const email = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (email && token) {
        const response = await axios.get('http://localhost:8080/api/users/getAll', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data.find(user => user.email === email);
        if (user) {
          setUserProfile(user);
          setFormData(user);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleEdit = () => setEditingUser(true);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/users/${userProfile.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setEditingUser(false);
      fetchUserProfile();  // Refresh profile data after update
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="profile-details">
        <h1 className="profile-title">User Profile</h1>
        {editingUser ? (
          <div className="profile-edit-form">
            <label className="profile-label">Name: 
              <input
                type="text"
                className="profile-input"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </label>
            <label className="profile-label">Email: 
              <input
                type="email"
                className="profile-input"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </label>
            <label className="profile-label">Password: 
              <input
                type="password"
                className="profile-input"
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </label>
            <button className="profile-button save-button" onClick={handleUpdate}>Save</button>
            <button className="profile-button cancel-button" onClick={() => setEditingUser(false)}>Cancel</button>
          </div>
        ) : (
          <div className="profile-view">
            <p><strong>Name:</strong> {userProfile?.name}</p>
            <p><strong>Email:</strong> {userProfile?.email}</p>
            <p><strong>Password:</strong> {userProfile?.password ? '********' : 'N/A'}</p>
            <button className="profile-button edit-button" onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
