import React, { useState } from 'react';
import '../styling/Contact.css';

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
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateContact();
    if (isValid) {
      console.log('Message sent!');
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setCountryCode('+91');
      setTermsAccepted(false);
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
    if (!phone || phone.length !== 10) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!termsAccepted) {
      errors.terms = 'You must accept the terms and conditions';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const closeModal = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="contact-container">
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
            <div className="form-group">
              <select
                name="countrycode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="select-field"
              >
                <option value="+91">IND(+91)</option>
                <option value="+1">USA(+1)</option>
                {/* Add other options as needed */}
              </select>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field phone-number"
                placeholder="Phone Number"
                maxLength="10" // Enforces maximum length
                required
              />
            </div>
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              required
            />
            <label htmlFor="terms">
              I agree to be contacted by Landsters.com and others for similar properties or related services via phone, sms, e-mail, WhatsApp etc.
            </label>
            {errors.terms && <div className="error">{errors.terms}</div>}
          </div>
          <button type="submit" className="btn">Request Call</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
