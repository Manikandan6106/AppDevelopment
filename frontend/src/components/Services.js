import React, { useEffect } from 'react';
import '../styling/Services.css'; // Ensure this path is correct
import AdminNavbar from './AdminNavbar';

const Services = ({ setBackground }) => {
  useEffect(() => {
    setBackground('../assets/i3.png'); // Update background image for Services page
    return () => {
      setBackground(''); // Optionally clear background when component unmounts
    };
  }, [setBackground]);

  return (
    <div className="services-container">
      <AdminNavbar />
      <div className="services-content">
        <h2>Our Real Estate Services</h2>
        <p>We offer a comprehensive range of real estate services to help you buy, sell, and manage properties. Our team of experts is dedicated to providing personalized solutions to meet your needs.</p>
        <div className="service-item">
          <h3>Property Listings</h3>
          <p>Browse through our extensive listings of residential and commercial properties. We offer detailed information and high-quality photos to help you find your dream property.</p>
        </div>
        <div className="service-item">
          <h3>Property Valuation</h3>
          <p>Get accurate property valuations with our expert appraisal services. We use the latest market data and trends to provide a comprehensive assessment of your property's value.</p>
        </div>
        <div className="service-item">
          <h3>Consultations</h3>
          <p>Schedule a consultation with our real estate experts to discuss your buying, selling, or investing needs. We offer personalized advice and strategies to help you achieve your goals.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
