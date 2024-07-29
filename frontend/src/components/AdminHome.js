// src/components/AdminHome.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styling/Home.css'; // Ensure this path is correct
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

const AdminHome = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      <AdminNavbar />
      <div className="hero-section">
        <h1>Find Your Dream Home</h1>
        <h2>Logged In As Admin</h2>
        <p>Explore the best properties in your area</p>
        <div className="search-bar">
          <input type="text" placeholder="Search by city, neighborhood, or ZIP code" />
          <button>Search</button>
        </div>
      </div>
      <div className="image-section">
        {/* Add any content or image here if needed */}
      </div>
      <Footer showFooter={showFooter} />
    </div>
  );
};

export default AdminHome;
