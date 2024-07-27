import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminLogin from './components/AdminLogin';
import AddListing from './components/AddListing';
import PropertyList from './components/PropertyList';
import Navbar from './components/Navbar';
import './styling/App.css';
import PrivacyPolicy from './components/PrivacyPolicy';

const App = () => {
  // Extract properties from PropertyList
  const [properties, setProperties] = React.useState([]);

  React.useEffect(() => {
    // Fetch properties or set them directly if needed
    const fetchProperties = async () => {
      const propertiesFromList = [
        {
          title: 'Beautiful House',
          description: 'A beautiful house in the suburbs.',
          type: 'House',
          image: '/assets/p1.png',
          propertyOption: 'sale',
        },
        {
          title: 'Modern Apartment',
          description: 'A modern apartment in the city center.',
          type: 'Apartment',
          image: '/assets/p2.png',
          propertyOption: 'rent',
        },
        {
          title: 'Spacious Villa',
          description: 'A spacious villa with a large garden.',
          type: 'Villa',
          image: '/assets/p3.png',
          propertyOption: 'lease',
        },
        {
          title: 'Cozy Cottage',
          description: 'A cozy cottage in a quiet neighborhood.',
          type: 'Cottage',
          image: '/assets/p4.png',
          propertyOption: 'sale',
        },
      ];
      setProperties(propertiesFromList);
    };

    fetchProperties();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/property-list" element={<PropertyList properties={properties} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
