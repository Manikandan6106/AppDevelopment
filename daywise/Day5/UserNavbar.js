import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styling/UserNavbar.css';
import userLogo from '../assets/logo1.png';
import UserSidebar from './UserSidebar'; // Update import

const UserNavbar = () => {
  const [visible, setVisible] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setVisible(currentScrollTop <= lastScrollTopRef.current);
      lastScrollTopRef.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <nav className={`user-navbar ${visible ? 'visible' : 'hidden'}`}>
        <div className="user-logo-container">
          <div className="user-logo-link" onClick={toggleSidebar}>
            <img src={userLogo} alt="User Logo" className="user-logo" />
          </div>
          <Link to="/user" className="user-home-link">Landsters RealEstates</Link>
        </div>
        <div className="user-right-links">
          <ul className="user-nav-links">
            <li><Link to="/user/about" className={location.pathname === '/user/about' ? 'active' : ''}>About</Link></li>
            <li><Link to="/user/services" className={location.pathname === '/user/services' ? 'active' : ''}>Services</Link></li>
            {/* <li><Link to="/user/contact" className={location.pathname === '/user/contact' ? 'active' : ''}>Contact Us</Link></li> */}
            <li><Link to="/user/privacy" className={location.pathname === '/user/privacy' ? 'active' : ''}>Privacy Policy</Link></li>
            <li><Link to="/user/propertylist" className={location.pathname === '/user/propertylist' ? 'active' : ''}>Property List</Link></li>
          </ul>
        </div>
      </nav>
      <UserSidebar isVisible={sidebarVisible} />
    </div>
  );
};

export default UserNavbar;
