import React, { useState } from 'react';
import '../styling/Contact.css'; // Ensure the path is correct
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'; // Import PhoneInput styles
import PhoneInput from 'react-phone-number-input';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Phone will now include country code
  const [message, setMessage] = useState(''); // Added message state
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handlePhoneChange = (value) => {
    setPhone(value); // Store the phone number with country code directly
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateContact();
    if (isValid) {
      try {
        const response = await axios.post("http://127.0.0.1:8080/api/contact/create", {
          name,
          email,
          phone, // Send the phone number with country code
          message, // Send the message
          termsAccepted,
        });

        if (response.status === 201) {
          toast.success("Message sent successfully!");
          setName('');
          setEmail('');
          setPhone('');
          setMessage(''); // Clear the message field
          setTermsAccepted(false);

          // Delay navigation by 3 seconds
          setTimeout(() => {
            navigate("/user");
          }, 3000);
        } else {
          toast.error("Failed to send message");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while sending the message");
      }
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
    
    // Ensure that the phone number is at least 10 digits without the country code
    if (!phone || phone.length < 10) {
        errors.phone = 'Phone number must be at least 10 digits';
    }

    if (!message) {
        errors.message = 'Message is required';
    }
    
    if (!termsAccepted) {
        errors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="contact-container-unique">
      <div className="contact-form-unique">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="contact-input-field">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {errors.name && <div className="contact-error">{errors.name}</div>}
          </div>
          <div className="contact-input-field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && <div className="contact-error">{errors.email}</div>}
          </div>
          <div className="contact-phone-input-field-unique">
            <div className="contact-phone-input-container-unique">
            <PhoneInput
            value={phone}
            onChange={handlePhoneChange}
            defaultCountry="IN"
            className="contact-phone-input-unique" // Apply the new class here
            placeholder="Phone Number"
            />

            </div>
            {errors.phone && <div className="contact-error">{errors.phone}</div>}
          </div>
          <div className="contact-input-field">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className="contact-message-input-unique"
            />
            {errors.message && <div className="contact-error">{errors.message}</div>}
          </div>
          <div className="contact-form-group">
            <input
              type="checkbox"
              id="contact-terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              required
            />
            <label htmlFor="contact-terms">
              I agree to be contacted by Landsters.com and others for similar properties or related services via phone, sms, e-mail, WhatsApp etc.
            </label>
            {errors.terms && <div className="contact-error">{errors.terms}</div>}
          </div>
          <button type="submit" className="contact-btn">Request Call</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
