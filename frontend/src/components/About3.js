import React from 'react';
import '../styling/About3.css';
 import UserNavbar from './UserNavbar';

const About3 = () => {
  return (
    <div className="about2">
      <UserNavbar />
      <div className="about3-container">
        <h1>About Us</h1>
        <p>
          Welcome to Landsters RealEstates, your trusted partner in real estate.
          With years of experience and a team of dedicated professionals, we
          offer comprehensive real estate services to meet all your needs.
        </p>
        <p>
          Our mission is to provide exceptional service and valuable
          insights to help you make informed decisions. Whether you're buying,
          selling, or investing, we are here to guide you every step of the way.
        </p>
        <p>
          We specialize in residential and commercial properties, offering
          personalized solutions to achieve your real estate goals. Our team is
          committed to delivering excellence and ensuring a seamless experience
          for all our clients.
        </p>
        <p>
          Thank you for considering Landsters RealEstates. We look forward to
          working with you and helping you achieve your real estate dreams.
        </p>
      </div>
    </div>
  );
};

export default About3;
