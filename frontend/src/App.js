// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminLogin from './components/AdminLogin';
import AddListing from './components/AddListing';
import PropertyList from './components/PropertyList';
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard
import './styling/App.css';
import PrivacyPolicy from './components/PrivacyPolicy';
import AdminHome from './components/AdminHome';
import About2 from './components/About2';

import p1 from './assets/p1.png';
import p2 from './assets/p2.png';
import p3 from './assets/p3.png';
import p4 from './assets/p4.png';

const App = () => {
  const [background, setBackground] = useState('');
  const [properties, setProperties] = useState([
    {
      title: 'Beautiful House',
      description: 'A beautiful house in the suburbs.',
      type: 'House',
      image: p1,
      propertyOption: 'Sale',
    },
    {
      title: 'Modern Apartment',
      description: 'A modern apartment in the city center.',
      type: 'Apartment',
      image: p2,
      propertyOption: 'Rent',
    },
    {
      title: 'Spacious Villa',
      description: 'A spacious villa with a large garden.',
      type: 'Villa',
      image: p3,
      propertyOption: 'Lease',
    },
    {
      title: 'Cozy Cottage',
      description: 'A cozy cottage in a quiet neighborhood.',
      type: 'Cottage',
      image: p4,
      propertyOption: 'Sale',
    },
  ]);

  const handleAddProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home properties={properties} />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-home/*" element={<AdminHome />} />
        <Route path="/admin-about" element={<About2 />} />
        <Route path="/admin-services/*" element={<Services setBackground={setBackground} />} />
        <Route path="/admin-privacy" element={<PrivacyPolicy />} />
        <Route path="/admin-propertyList/*" element={<PropertyList properties={properties} />} />
        <Route path="/add-listing" element={<AddListing onAddProperty={handleAddProperty} />} />
        <Route path="/property-list" element={<PropertyList properties={properties} />} />
        <Route path="/admindashboard/*" element={<AdminDashboard properties={properties} handleAddProperty={handleAddProperty} />} />
        <Route path="/admindashboard/*" element={<AdminDashboard properties={properties} />} />

      </Routes>
    </div>
  );
};

export default App;
