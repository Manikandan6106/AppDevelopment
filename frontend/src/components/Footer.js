import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Footer.css';

const Footer = ({ showFooter }) => {
  return (
    <footer className={`footer ${showFooter ? 'footer-visible' : ''}`}>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Landsters Real Estates. All Rights Reserved.</p>
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
