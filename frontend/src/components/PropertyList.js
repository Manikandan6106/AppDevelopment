// src/components/PropertyList.js
import React from 'react';
import '../styling/PropertyList.css';

const PropertyList = ({ properties }) => {
  return (
    <div className="property-list-container">
      <h2 className="property-list-title">Property Listings</h2>
      <div className="property-list">
        {properties.map((property, index) => (
          <div key={index} className="property-card">
            <img src={property.image} alt={property.title} className="property-image" />
            <div className="property-details">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-description">{property.description}</p>
              <p className="property-type">Type: {property.type}</p>
              <p className="property-option">Option: {property.propertyOption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
