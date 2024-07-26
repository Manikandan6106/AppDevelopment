import React, { useState } from 'react';
import '../styling/AddListing.css';

const AddListing = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateListing();
    if (isValid) {
      onAdd({ title, price, beds, baths, image });
      // Clear the form
      setTitle('');
      setPrice('');
      setBeds('');
      setBaths('');
      setImage('');
    }
  }

  const validateListing = () => {
    const errors = {};
    if (!title) {
      errors.title = 'Title is required';
    }
    if (!price) {
      errors.price = 'Price is required';
    }
    if (!beds) {
      errors.beds = 'Beds are required';
    }
    if (!baths) {
      errors.baths = 'Baths are required';
    }
    if (!image) {
      errors.image = 'Image URL is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <div className="add-listing">
      <h2>Add a New Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Property Title"
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div className="input-field">
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Property Price"
          />
          {errors.price && <div className="error">{errors.price}</div>}
        </div>
        <div className="input-field">
          <label>Beds</label>
          <input
            type="text"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            placeholder="Number of Beds"
          />
          {errors.beds && <div className="error">{errors.beds}</div>}
        </div>
        <div className="input-field">
          <label>Baths</label>
          <input
            type="text"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            placeholder="Number of Baths"
          />
          {errors.baths && <div className="error">{errors.baths}</div>}
        </div>
        <div className="input-field">
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
          />
          {errors.image && <div className="error">{errors.image}</div>}
        </div>
        <button type="submit" className="btn">Add Listing</button>
      </form>
    </div>
  );
}

export default AddListing;
