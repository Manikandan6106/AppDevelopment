import React, { useState } from 'react';
import '../styling/AddListing.css';
import Navbar from './Navbar';

const AddListing = ({ onAddProperty }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [propertyOption, setPropertyOption] = useState('sale');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const newProperty = {
        title,
        description,
        type,
        image,
        propertyOption,
      };
      onAddProperty(newProperty);
      // Reset form
      setTitle('');
      setDescription('');
      setType('');
      setImage('');
      setPropertyOption('sale');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = 'Title is required';
    if (!description) errors.description = 'Description is required';
    if (!type) errors.type = 'Type is required';
    if (!image) errors.image = 'Image is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRadioChange = (value) => {
    setPropertyOption(value);
  };

  return (
    <div className="add-listing-container">
      <Navbar/>
      <div className="add-listing-form">
        <h2 className="title">List Your Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>
          <div className="input-field">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </div>
          <div className="input-field">
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Type"
            />
            {errors.type && <div className="error">{errors.type}</div>}
          </div>
          <div className="input-field">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            />
            {errors.image && <div className="error">{errors.image}</div>}
          </div>
          <div className="radio-group">
            <div
              id="sale"
              className={`radioInput ${propertyOption === 'sale' ? 'active' : ''}`}
              onClick={() => handleRadioChange('sale')}
            >
              <span>Sale</span>
            </div>
            <div
              id="rent"
              className={`radioInput ${propertyOption === 'rent' ? 'active' : ''}`}
              onClick={() => handleRadioChange('rent')}
            >
              <span>Rent</span>
            </div>
            <div
              id="lease"
              className={`radioInput ${propertyOption === 'lease' ? 'active' : ''}`}
              onClick={() => handleRadioChange('lease')}
            >
              <span>Lease</span>
            </div>
          </div>
          <button type="submit" className="btn">Add Listing</button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
