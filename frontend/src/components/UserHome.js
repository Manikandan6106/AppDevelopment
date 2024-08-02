import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import UserNavbar from './UserNavbar';
import Sidebar from './Sidebar';
import PropertyList from './PropertyList';
import '../styling/Home.css'; // Ensure this path is correct

const UserHome = ({ properties }) => {
  const [showFooter, setShowFooter] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  return (
    <div className="home-container">
       <Sidebar isVisible={sidebarVisible} isUserHome={true} />
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

export default UserHome;
