import React from 'react';
import PropTypes from 'prop-types';
import '../styling/PropertyList.css'; // Ensure this path is correct
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar'; // Import AdminNavbar component

const PropertyList = ({ properties, isAdmin }) => {
  return (
    <div className="property-list-container">
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <h2 className="property-list-title">Property Listings</h2>
      <div className="property-list">
        {properties.map((property, index) => (
          <div key={index} className="property-card">
            <div className="property-image-container">
              <img src={property.image} alt={property.title} className="property-image" />
            </div>
            <div className="property-details">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-description">{property.description}</p>
              <p className="property-type"><strong>Type:</strong> {property.type}</p>
              <p className="property-option"><strong>Option:</strong> {property.propertyOption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PropertyList.propTypes = {
  properties: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

PropertyList.defaultProps = {
  properties: [],
};

export default PropertyList;
