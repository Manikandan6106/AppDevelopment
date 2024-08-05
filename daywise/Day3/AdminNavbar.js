import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styling/AdminNavbar.css';
import logo from '../assets/logo1.png';
import AdminSidebar from './AdminSidebar'; // Update import

const AdminNavbar = () => {
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
      <nav className={`admin-navbar ${visible ? 'visible' : 'hidden'}`}>
        <div className="admin-logo-container">
          <div className="admin-logo-link" onClick={toggleSidebar}>
            <img src={logo} alt="Admin Logo" className="admin-logo" />
          </div>
          <Link to="/admin" className="admin-home-link">Landsters RealEstates</Link>
        </div>
        <div className="admin-right-links">
          <ul className="admin-nav-links">
            <li><Link to="/admin/about2" className={location.pathname === '/admin/about2' ? 'active' : ''}>About</Link></li>
            <li><Link to="/admin/services" className={location.pathname === '/admin/services' ? 'active' : ''}>Services</Link></li>
            <li><Link to="/admin/privacy" className={location.pathname === '/admin/privacy' ? 'active' : ''}>Privacy Policy</Link></li>
            <li><Link to="/admin/propertylist" className={location.pathname === '/admin/propertylist' ? 'active' : ''}>Property List</Link></li>
            <li><Link to="/admin/addList" className={location.pathname === '/admin/addList' ? 'active' : ''}>Add Listing</Link></li>
          </ul>
        </div>
      </nav>
      <AdminSidebar isVisible={sidebarVisible} />
    </div>
  );
};

export default AdminNavbar;
