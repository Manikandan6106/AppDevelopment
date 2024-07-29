import React, { useState } from 'react';
import '../styling/Contact.css';
import Navbar from './Navbar';

const Modal = ({ message, onClose }) => (
  <div className="modal-overlay">
    <div className="modal">
      <p>{message}</p>
      <button onClick={onClose} className="btn">Close</button>
    </div>
  </div>
);

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateContact();
    if (isValid) {
      console.log('Message sent!');
      setIsSubmitted(true); // Show the modal
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  const validateContact = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!message) {
      errors.message = 'Message is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const closeModal = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="contact-container">
      <Navbar/>
      {isSubmitted && <Modal message="Message Sent Successfully!" onClose={closeModal} />}
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="input-field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="input-field">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
            ></textarea>
            {errors.message && <div className="error">{errors.message}</div>}
          </div>
          <button type="submit" className="btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
