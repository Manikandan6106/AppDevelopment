import React from 'react';
import '../styling/Footer.css';
import twitterIcon from '../assets/twitter.png';
import socialIcon from '../assets/social.png';
import instagramIcon from '../assets/instagram.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section">
        <h3>Mobile Apps</h3>
        <div className="footer__appContainer">
          <a href="https://play.google.com/store/apps/details?id=com.nnacres.app&hl=en" target="_blank" rel="noopener noreferrer">
            <img src="https://static.99acres.com/universalapp/img/Play.png" alt="99acres Android App" />
          </a>
          <a href="https://itunes.apple.com/in/app/99acres-property-search/id781765588" target="_blank" rel="noopener noreferrer">
            <img src="https://static.99acres.com/universalapp/img/ios.png" alt="99acres iOS App" />
          </a>
        </div>
        <h3>Connect with us</h3>
        <div className="footer__social">
          <a href="https://twitter.com">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a href="https://facebook.com">
            <img src={socialIcon} alt="Facebook" />
          </a>
          <a href="https://instagram.com">
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </div>
      </div>
      <div className="footer__section">
        <h3>Our Services</h3>
        <ul>
          <li><a href="#">Price Trends</a></li>
          <li><a href="#">Post your Property</a></li>
          <li><a href="#">Real Estate Investments</a></li>
          <li><a href="#">Builders in India</a></li>
          <li><a href="#">Area Converter</a></li>
          <li><a href="#">Articles</a></li>
          <li><a href="#">Rent Receipt</a></li>
          <li><a href="#">Customer Service</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
      </div>
      <div className="footer__section">
        <h3>Company</h3>
        <ul>
          <li><a href="#">About us</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Careers with us</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Request Info</a></li>
          <li><a href="#">Feedback</a></li>
          <li><a href="#">Report a problem</a></li>
          <li><a href="#">Testimonials</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Summons/Notices</a></li>
          <li><a href="#">Grievances</a></li>
          <li><a href="#">Safety Guide</a></li>
        </ul>
      </div>
      <div className="footer__section">
        <h3>Contact Us</h3>
        <p>Toll Free - 1800 41 99099</p>
        <p>9:30 AM to 6:30 PM (Mon-Sun)</p>
        <p>Email - <a href="mailto:feedback@landsters.com">feedback@landsters.com</a></p>
      </div>
      <div className="footer__section footer__legal">
        <h3>Legals</h3>
        <p>All trademarks are the property of their respective owners. All rights reserved - Info Edge (India) Ltd. A naukri.com group venture.</p>
      </div>
    </footer>
  );
};

export default Footer;
