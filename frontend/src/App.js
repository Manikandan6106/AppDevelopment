import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import AddListing from './components/AddListing';
import PropertyList from './components/PropertyList';
import PrivacyPolicy from './components/PrivacyPolicy';
import AdminHome from './components/AdminHome';
import About2 from './components/About2';
import UserHome from './components/UserHome';
import './styling/App.css';

import p1 from './assets/p1.png';
import p2 from './assets/p2.png';
import p3 from './assets/p3.png';
import p4 from './assets/p4.png';
import About3 from './components/About3';
import UserServices from './components/UserServices';
import UserPrivacy from './components/UserPrivacy';

const App = () => {
  const [properties, setProperties] = useState([
    {
      title: 'Beautiful House',
      description: 'A beautiful house in the suburbs.',
      type: 'House',
      image: p1,
      propertyOption: 'Sale',
      price: '20 Cr',
      pricePerSqft: '77,973',
      size: '2,565',
      location: 'Adayar, Chennai'
    },
    {
      title: 'Modern Apartment',
      description: 'A modern apartment in the city center.',
      type: 'Apartment',
      image: p2,
      propertyOption: 'Rent',
      price: '15 Cr',
      pricePerSqft: '65,000',
      size: '2,000',
      location: 'PeelaMedu, Coimbatore'
    },
    {
      title: 'Spacious Villa',
      description: 'A spacious villa with a large garden.',
      type: 'Villa',
      image: p3,
      propertyOption: 'Lease',
      price: '25 Cr',
      pricePerSqft: '80,000',
      size: '3,000',
      location: 'KK Nagar, Madurai'
    },
    {
      title: 'Cozy Cottage',
      description: 'A cozy cottage in a quiet neighborhood.',
      type: 'Cottage',
      image: p4,
      propertyOption: 'Sale',
      price: '10 Cr',
      pricePerSqft: '50,000',
      size: '1,500',
      location: 'NGO Colony, Tirunelveli'
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
        <Route path="/admin" element={<AdminHome properties={properties} />} />
        <Route path="/user" element={<UserHome properties={properties} />} />
        <Route path="/admin/about2" element={<About2 />} />
        <Route path="/user/about" element={<About3 />} />
        <Route path="/user/services" element={<UserServices />} />
        <Route path="/user/privacy" element={<UserPrivacy />} />
        <Route path="/user/propertylist" element={<PropertyList properties={properties} isAdmin={false} />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/privacy" element={<PrivacyPolicy />} />
        <Route path="/admin/addList" element={<AddListing onAddProperty={handleAddProperty} />} />
        <Route path="/admin/propertylist" element={<PropertyList properties={properties} isAdmin={true} />} />
        <Route path="/add-listing" element={<AddListing onAddProperty={handleAddProperty} />} />
        <Route path="/propertylist" element={<PropertyList properties={properties} isAdmin={false} />} />
      </Routes>
    </div>
  );
};

export default App;
