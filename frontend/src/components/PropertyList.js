import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/PropertyList.css';
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import AdminNavbar from './AdminNavbar';

const PropertyList = ({ isAdmin, isLoggedIn }) => {
  const [properties, setProperties] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [propertyToRemove, setPropertyToRemove] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isStandalonePage = location.pathname === '/propertylist' || location.pathname === '/admin/propertylist' || location.pathname === '/user/propertylist';
  const isUserPage = location.pathname.startsWith('/user');
  const isAdminPage = location.pathname.startsWith('/admin');
  const isHomepage = location.pathname === '/' || location.pathname === '/propertylist';

  const renderNavbar = () => {
    if (isAdminPage) {
      return <AdminNavbar />;
    }
    if (isUserPage) {
      return <UserNavbar />;
    }
    return <Navbar />;
  };

  // Fetch properties from backend
  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        'http://127.0.0.1:8080/api/properties/getAll',
        config
      );
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleBookNowClick = (propertyId) => {
    if (isUserPage) {
      navigate('/user/booknow', { state: { propertyId } });
    } else {
      navigate('/login');
    }
  };

  const handleContactClick = (property) => {
    navigate('/contact', { state: { property } });
  };

  const handleRemoveClick = (propertyId) => {
    setPropertyToRemove(propertyId);
    setShowConfirmation(true);
  };

  const confirmRemove = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://127.0.0.1:8080/api/properties/${propertyToRemove}`, config);
      setProperties(properties.filter(property => property.id !== propertyToRemove));
      setShowConfirmation(false);
      setPropertyToRemove(null);
    } catch (error) {
      console.error('Error removing property:', error);
    }
  };

  const cancelRemove = () => {
    setShowConfirmation(false);
    setPropertyToRemove(null);
  };

  return (
    <div className={`property-list-container ${isStandalonePage ? 'standalone' : 'homepage'}`}>
      {renderNavbar()}
      <h2 className="property-list-title">
        {isAdmin ? 'Property Listings' : 'Explore Properties Nearby'}
      </h2>
      {properties.length === 0 ? (
        <p>No properties available at this time.</p>
      ) : (
        <div className="property-list">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image-container">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="property-image" 
                  onError={(e) => {
                    e.target.src = '/path/to/default-image.jpg'; // Fallback image
                  }}
                />
              </div>
              <div className="property-details">
                {isAdmin && <p className="property-id"><strong>Property ID:</strong> {property.id}</p>}
                <h3 className="property-title">{property.title}</h3>
                <p className="property-price">₹{property.price}</p>
                <p className="property-description">{property.description}</p>
                <p className="property-type"><strong>Type:</strong> {property.type}</p>
                <p className="property-option"><strong>Option:</strong> {property.propertyOption}</p>
                <p className="property-location"><strong>Location:</strong> {property.location}</p>
                <div className="property-buttons">
                  {isAdmin ? (
                    <>
                      <button className="remove-button" onClick={() => handleRemoveClick(property.id)}>Remove</button>
                      <button className="edit-button" onClick={() => navigate(`/admin/edit-property/${property.id}`)}>Edit</button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="contact-button" 
                        onClick={() => handleContactClick(property)}
                      >
                        Contact
                      </button>
                      {(isUserPage || isHomepage) && (
                        <button 
                          className="book-now-button" 
                          onClick={() => handleBookNowClick(property.id)}
                        >
                          Book Now
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>Are you sure you want to remove this property?</p>
            <button className="confirm-button" onClick={confirmRemove}>Yes</button>
            <button className="cancel-button" onClick={cancelRemove}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

PropertyList.propTypes = {
  isAdmin: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

PropertyList.defaultProps = {
  isAdmin: false,
  isLoggedIn: false,
};

export default PropertyList;
