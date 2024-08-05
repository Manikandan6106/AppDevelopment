import React, { useState, useEffect } from 'react';
import '../styling/Home.css';
import Footer from './Footer'; // Ensure Footer is imported correctly
import Navbar from './Navbar'; // Import the Navbar component
import PropertyList from './PropertyList'; // Import PropertyList component

const Home = ({ properties }) => {
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
       <div className="hero-section">
        <h1>Find Your Dream Home</h1>
        <p>Explore the best properties in your area</p>
        <div className="search-bar">
          <input type="text" placeholder="Search by city, neighborhood, or ZIP code" />
          <button>Search</button>
        </div>
      </div>

      {/* Property List below the search bar */}
      <div className="property-list-hero">
        <PropertyList properties={properties} isAdmin={false} isHomepage={true} />
      </div>

      <Footer showFooter={showFooter} />
    </div>
  );
};

export default Home;
