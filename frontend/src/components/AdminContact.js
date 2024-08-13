import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import '../styling/AdminContact.css'; // Import the CSS for AdminContact

const AdminContact = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [contacts, setContacts] = useState([]);

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
        const response = await fetch('http://127.0.0.1:8080/api/contact/getAll', config);
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        } else {
          console.error('Failed to fetch contact data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteContact = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8080/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setContacts(contacts.filter(contact => contact.id !== id));
        console.log('Deleted successfully');
      } else {
        console.error('Failed to delete the contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`admin-contact-container ${sidebarVisible ? 'sidebar-open' : ''}`}>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isVisible={sidebarVisible} />
      <div className="admin-contact-content">
        <h2 className="admin-contact-heading">Contact Details</h2>
        <table className="admin-contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Message</th>
              <th>Property ID</th> {/* Add Property ID column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.message}</td>
                <td>{contact.propertyId}</td> {/* Display Property ID */}
                <td>
                  <button 
                    className="delete-btn" 
                    onClick={() => deleteContact(contact.id)}
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

export default AdminContact;
