import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import '../styling/AdminNavbar.css'; // Ensure this path is correct

const AdminNavbar = () => {
  const [visible, setVisible] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <nav className={`admin-navbar ${visible ? 'visible' : 'hidden'}`}>
        <div className="logo-container">
          <div className="admin-logo-link" onClick={toggleSidebar}>
            <MdAdminPanelSettings className="admin-logo" />
          </div>
          <Link to="/" className="home-link">Landsters RealEstates</Link>
        </div>
        <div className="right-links">
          <ul className="nav-links">
            <li>
              <Link
                to="/admin-about"
                className={location.pathname === '/admin-about' ? 'active' : ''}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/admin-services"
                className={location.pathname === '/admin-services' ? 'active' : ''}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/admin-privacy"
                className={location.pathname === '/admin-privacy' ? 'active' : ''}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/admin-propertyList"
                className={location.pathname === '/admin-propertyList' ? 'active' : ''}
              >
                Property List
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {sidebarVisible && <Sidebar />}
    </div>
  );
};

const Sidebar = () => (
  <div className="sidebar">
    <ul>
      <li>Notifications</li>
      <li>Commissions</li>
      <li>Feedbacks</li>
      <li>Schedules</li>
      <li>Reports</li>
    </ul>
  </div>
);

export default AdminNavbar;
