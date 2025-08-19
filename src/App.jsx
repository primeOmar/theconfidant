import './App.css';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages and Components
import Navbar from './components/Navbar';
import HeroSection from './components/Hero';
import Services from './components/Services';
import AboutSection from './components/About';
import Footer from './components/Footer';
import ContactForm from './components/Contact';
import BookingForm from './components/BookingForm'; // Assuming this is your booking component


function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Services />
      <AboutSection />
      <ContactForm />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
