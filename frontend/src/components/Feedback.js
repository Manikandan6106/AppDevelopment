import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import '../styling/Feedback.css'; // Ensure the path is correct based on your project structure
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Feedback() {
  const [displayForm, setDisplayForm] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState({}); // Define errors state
  const [thankYouMessage, setThankYouMessage] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const validateForm = () => {
    const formErrors = {};
    
    if (name.trim() === '') {
      formErrors.name = 'Name is required';
    }
    if (email.trim() === '') {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Invalid email address';
    }
    if (!phone) {
      formErrors.phone = 'Phone number is required';
    } else if (phone.length < 10) {
      formErrors.phone = 'Phone number must be at least 10 digits';
    }
    if (rating.trim() === '') {
      formErrors.rating = 'Rating is required';
    }
    if (review.trim() === '') {
      formErrors.review = 'Review is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://127.0.0.1:8080/api/feedback/create",
          { name, email, phone, rating, review },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          toast.success('Feedback submitted successfully!');
          setThankYouMessage(true);
          setDisplayForm(false);
          
          // Redirect to /user after 5 seconds
          setTimeout(() => {
            navigate('/user');
          }, 5000);
        } else {
          toast.error('Failed to submit feedback');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            // Handle token expiration
            toast.error('Session expired. Please log in again.');
            // Redirect to login or refresh token logic
          } else {
            toast.error(`Error: ${error.response.data.message || 'An error occurred'}`);
          }
        } else if (error.request) {
          toast.error('No response received from the server');
        } else {
          toast.error('An error occurred while submitting feedback');
        }
      }
    }
  };

  return (
    <div id="div-app">
      <Container className="landsters-feedback-container">
        {displayForm ? (
          <Card className="landsters-feedback-card">
            <Card.Body>
              <Card.Title className="landsters-feedback-card-title">Feedback Form</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="landsters-feedback-form-group">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="landsters-feedback-form-control"
                  />
                  {errors.name && <Alert variant="danger" className="landsters-feedback-alert">{errors.name}</Alert>}
                </Form.Group>
                <Form.Group controlId="formEmail" className="landsters-feedback-form-group">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="landsters-feedback-form-control"
                  />
                  {errors.email && <Alert variant="danger" className="landsters-feedback-alert">{errors.email}</Alert>}
                </Form.Group>
                <Form.Group controlId="formPhone" className="landsters-feedback-form-group">
                  <Form.Label>Phone</Form.Label>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    className="landsters-feedback-form-control"
                  />
                  {errors.phone && <Alert variant="danger" className="landsters-feedback-alert">{errors.phone}</Alert>}
                </Form.Group>
                <Form.Group controlId="formRating" className="landsters-feedback-form-group">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="landsters-feedback-form-control"
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Form.Control>
                  {errors.rating && <Alert variant="danger" className="landsters-feedback-alert">{errors.rating}</Alert>}
                </Form.Group>
                <Form.Group controlId="formReview" className="landsters-feedback-form-group">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="landsters-feedback-form-control"
                  />
                  {errors.review && <Alert variant="danger" className="landsters-feedback-alert">{errors.review}</Alert>}
                </Form.Group>
                <Button variant="primary" className="landsters-feedback-submit-btn" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        ) : (
          <Card className="landsters-feedback-card">
            <Card.Body>
              <Card.Title className="landsters-feedback-card-title">Thank You for Your Feedback!</Card.Title>
              <Card.Text className="landsters-feedback-thank-you-message">
                Your feedback is precious to us.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
      <ToastContainer /> {/* Include ToastContainer for toast notifications */}
    </div>
  );
}

export default Feedback;
