// src/components/EditProperty.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/EditProperty.css';

const EditProperty = () => {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: '',
    description: '',
    type: '',
    image: '',
    propertyOption: '',
    price: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://127.0.0.1:8080/api/properties/${id}`, config);
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://127.0.0.1:8080/api/properties/${id}`, property, config);
      navigate('/admin/propertylist'); // Navigate back to property list
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-property-container">
      <div className="edit-property-form-container">
        <h2 className="edit-property-title">Edit Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="edit-property-input-field">
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={property.title}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="edit-property-input-field">
            <label>
              Description:
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="edit-property-input-field">
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={property.type}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="edit-property-input-field">
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={property.image}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="edit-property-input-field">
            <label>
              Property Option:
              <input
                type="text"
                name="propertyOption"
                value={property.propertyOption}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="edit-property-input-field">
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={property.price}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="edit-property-input-field">
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={property.location}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit" className="edit-property-btn">Update Property</button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
