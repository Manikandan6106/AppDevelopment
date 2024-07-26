import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminLogin from './components/AdminLogin'; // Ensure this is imported correctly
import Navbar from './components/Navbar';
import './styling/App.css'; // Import the main CSS file

const BackgroundContext = createContext();

const App = () => {
  const [background, setBackground] = useState('');

  return (
    <Router>
      <BackgroundContext.Provider value={{ background, setBackground }}>
        <div className="app-container" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Navbar /> {/* Include Navbar here */}
          <Routes>
            <Route path="/" element={<Home setBackground={setBackground} />} />
            <Route path="/about" element={<About setBackground={setBackground} />} />
            <Route path="/services" element={<Services setBackground={setBackground} />} />
            <Route path="/contact" element={<Contact setBackground={setBackground} />} />
            <Route path="/login" element={<Login setBackground={setBackground} />} />
            <Route path="/signup" element={<Signup setBackground={setBackground} />} />
            <Route path="/adminlogin" element={<AdminLogin setBackground={setBackground} />} /> {/* Corrected route */}
          </Routes>
        </div>
      </BackgroundContext.Provider>
    </Router>
  );
};

export default App;
