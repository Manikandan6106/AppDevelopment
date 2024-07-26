import React, { useState, useEffect } from 'react';
import image1 from '../assets/image1.png'; // Ensure this path is correct
import '../styling/Home.css';
import Footer from './Footer';

const Home = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `url(${image1})` }}>
        <h1>Find Your Dream Home</h1>
        <p>Explore the best properties in your area</p>
        <div className="search-bar">
          <input type="text" placeholder="Search by city, neighborhood, or ZIP code" />
          <button>Search</button>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="featured-properties">
        <h2>Featured Properties</h2>
        <div className="properties-list">
          <div className="property-item">
            <img src="https://via.placeholder.com/150" alt="Property 1" />
            <h3>Beautiful Family House</h3>
            <p>$500,000 · 4 Beds · 3 Baths</p>
          </div>
          <div className="property-item">
            <img src="https://via.placeholder.com/150" alt="Property 2" />
            <h3>Modern Apartment</h3>
            <p>$300,000 · 2 Beds · 2 Baths</p>
          </div>
          <div className="property-item">
            <img src="https://via.placeholder.com/150" alt="Property 3" />
            <h3>Luxury Villa</h3>
            <p>$1,200,000 · 5 Beds · 4 Baths</p>
          </div>
          <div className="property-item">
            <img src="https://via.placeholder.com/150" alt="Property 4" />
            <h3>Cozy Cottage</h3>
            <p>$350,000 · 3 Beds · 2 Baths</p>
          </div>
        </div>
      </div>

      {/* Conditionally render Footer */}
      {showFooter && <Footer />}
    </div>
  );
}

export default Home;
