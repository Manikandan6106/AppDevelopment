import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styling/Navbar.css';

const Navbar = () => {
  const [visible, setVisible] = useState(true);
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

  return (
    <nav className={`main-navbar ${visible ? 'visible' : 'hidden'}`}>
      <Link to="/" className="main-home-link">Landsters RealEstates</Link>
      <ul className="main-nav-links">
        <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link></li>
        <li><Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Signup</Link></li>
        {/* <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li> */}
        <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
        <li><Link to="/propertylist" className={location.pathname === '/propertylist' ? 'active' : ''}>Property List</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
