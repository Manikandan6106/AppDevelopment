import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import '../styling/PropertyList.css'; // Ensure the path is correct
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import AdminNavbar from './AdminNavbar';

const PropertyList = ({ properties, isAdmin }) => {
  const location = useLocation();
  const isStandalonePage = location.pathname === '/propertylist' || location.pathname === '/admin/propertylist' || location.pathname === '/user/propertylist';
  const isUserPage = location.pathname.startsWith('/user');
  const isAdminPage = location.pathname.startsWith('/admin');

  // Determine the appropriate Navbar component
  const renderNavbar = () => {
    if (isAdminPage) {
      return <AdminNavbar />;
    }
    if (isUserPage) {
      return <UserNavbar />;
    }
    return <Navbar />;
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
          {properties.map((property, index) => (
            <div key={index} className="property-card">
              <div className="property-image-container">
                <img src={property.image} alt={property.title} className="property-image" />
              </div>
              <div className="property-details">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-price">₹{property.price}</p>
                <p className="property-price-per-sqft">₹{property.pricePerSqft} per sqft</p>
                <p className="property-size">{property.size} sqft</p>
                <p className="property-description">{property.description}</p>
                <p className="property-type"><strong>Type:</strong> {property.type}</p>
                <p className="property-option"><strong>Option:</strong> {property.propertyOption}</p>
                <p className="property-location"><strong>Location:</strong> {property.location}</p>
                <div className="property-buttons">
                  <button className="contact-button">Contact</button>
                  <button className="request-details-button"><p>Request Details</p></button>
                  {isAdmin && <button className="edit-button">Edit</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

PropertyList.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    pricePerSqft: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    propertyOption: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  })).isRequired,
  isAdmin: PropTypes.bool
};

PropertyList.defaultProps = {
  isAdmin: false
};

export default PropertyList;
