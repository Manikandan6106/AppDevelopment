import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import '../styling/Feedback.css'; // Ensure the path is correct based on your project structure

function Feedback() {
  const [displayForm, setDisplayForm] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [errorMessage, setErrorMessage] = useState('Please enter the value for the above field');
  const [thankYouMessage, setThankYouMessage] = useState(false);

  const validateForm = () => {
    setErrorMessage('Please enter the value for the above field');

    [...document.getElementsByClassName('alert-danger')].forEach(element => {
      element.style.display = 'none';
    });

    if (name === '') {
      document.getElementById('nameError').style.display = 'block';
    } else if (email === '') {
      document.getElementById('emailError').style.display = 'block';
    } else if (!email.includes('.com') || !email.includes('@')) {
      document.getElementById('emailError').style.display = 'block';
      setErrorMessage('Invalid Email');
    } else if (!phone) {
      document.getElementById('phoneError').style.display = 'block';
    } else if (phone.length < 10) {
      document.getElementById('phoneError').style.display = 'block';
      setErrorMessage('Invalid Phone Number');
    } else if (rating === '') {
      document.getElementById('ratingError').style.display = 'block';
    } else if (review === '') {
      document.getElementById('reviewError').style.display = 'block';
    } else {
      setThankYouMessage(true);
      setDisplayForm(false);
    }
  };

  return (
    <div id="div-app">
      <Container className="landsters-feedback-container">
        {displayForm ? (
          <Card className="landsters-feedback-card">
            <Card.Body>
              <Card.Title className="landsters-feedback-card-title">Feedback Form</Card.Title>
              <Form>
                <Form.Group controlId="formName" className="landsters-feedback-form-group">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="landsters-feedback-form-control"
                  />
                  <Alert variant="danger" id="nameError" className="landsters-feedback-alert" style={{ display: 'none' }}>
                    {errorMessage}
                  </Alert>
                </Form.Group>
                <Form.Group controlId="formEmail" className="landsters-feedback-form-group">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="landsters-feedback-form-control"
                  />
                  <Alert variant="danger" id="emailError" className="landsters-feedback-alert" style={{ display: 'none' }}>
                    {errorMessage}
                  </Alert>
                </Form.Group>
                <Form.Group controlId="formPhone" className="landsters-feedback-form-group">
                  <Form.Label>Phone</Form.Label>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    className="landsters-feedback-form-control"
                  />
                  <Alert variant="danger" id="phoneError" className="landsters-feedback-alert" style={{ display: 'none' }}>
                    {errorMessage}
                  </Alert>
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
                  <Alert variant="danger" id="ratingError" className="landsters-feedback-alert" style={{ display: 'none' }}>
                    {errorMessage}
                  </Alert>
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
                  <Alert variant="danger" id="reviewError" className="landsters-feedback-alert" style={{ display: 'none' }}>
                    {errorMessage}
                  </Alert>
                </Form.Group>
                <Button variant="primary" className="landsters-feedback-submit-btn" onClick={validateForm}>
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
    </div>
  );
}

export default Feedback;
