import React, { useState, useEffect } from 'react';
import '../styling/Home.css';
import Footer from './Footer'; // Ensure Footer is imported correctly
import Navbar from './Navbar'; // Import the Navbar component

const Home = () => {
  const [showFooter, setShowFooter] = useState(false); // Initially hide the footer

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;

      if (scrollTop + clientHeight >= scrollHeight - 50) { // Show footer when near the bottom
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
      {/* Hero Section */}
      <div className="hero-section">
        {/* Navbar */}
        <Navbar />

        <h1>Find Your Dream Home</h1>
        <p>Explore the best properties in your area</p>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search by city, neighborhood, or ZIP code" />
          <button>Search</button>
        </div>
      </div>

      {/* Image Section */}
      <div className="image-section">
        {/* Add any content or image here if needed */}
      </div>

      {/* Footer */}
      <Footer showFooter={showFooter} />
    </div>
  );
};

export default Home;
