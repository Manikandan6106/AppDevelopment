// Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styling/Navbar.css'; // Ensure this path is correct

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const lastScrollTopRef = useRef(0); // Use ref to persist scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTopRef.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollTopRef.current = currentScrollTop <= 0 ? 0 : currentScrollTop; // Update ref value
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array to only set up the scroll listener once

  const isAdminHome = location.pathname === '/admin-home'; // Check if current path is AdminHome

  return (
    <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
      <Link to="/" className="home-link">Landsters RealEstates</Link>
      <ul className="nav-links">
        <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link></li>
        <li><Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Signup</Link></li>
        <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
        <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
        <li><Link to="/property-list" className={location.pathname === '/property-list' ? 'active' : ''}>Property List</Link></li>
        {!isAdminHome && (
          <>
            <li><Link to="/add-listing" className={`btn-add-listing ${location.pathname === '/add-listing' ? 'active' : ''}`}>Add Listing</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
