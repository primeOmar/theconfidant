import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaHeart, FaHandHoldingHeart, FaBrain, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  // State for contact options
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Contact details
  const whatsappNumber = '+254727533905'; // Replace with actual number
  const whatsappMessage = 'Hello, I would like to schedule a counselling session.';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Background element animation config
  const bgElement1 = {
    animate: {
      x: [0, 20, 0],
      y: [0, 15, 0],
    },
    transition: {
      duration: 15,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  const bgElement2 = {
    animate: {
      x: [0, -30, 0],
      y: [0, -20, 0],
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: 2
    }
  };

  // Handle contact option selection
  const handleContactClick = () => setShowContactOptions(true);
  const closeContactModal = () => {
    setShowContactOptions(false);
    setSelectedOption(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form to backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        closeContactModal();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section className="relative bg-dark-500 text-white overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-para opacity-10"
          animate={bgElement1.animate}
          transition={bgElement1.transition}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-green-700 opacity-5"
          animate={bgElement2.animate}
          transition={bgElement2.transition}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <motion.div variants={itemVariants}>
              <p className="text-para font-semibold mb-4 flex items-center">
                <FaHeart className="mr-2" /> Compassionate Care
              </p>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              Find Your <span className="text-para">Inner Peace</span> With Professional Guidance
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8 max-w-lg"
              variants={itemVariants}
            >
              Our licensed therapists provide personalized counseling to help you navigate life's challenges and achieve mental wellness.
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <motion.div
                className="bg-para hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium text-center transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/book" className="block w-full h-full">
                  Book a Session
                </Link>
              </motion.div>
              
              <motion.button
                className="border border-para text-para hover:bg-green-900 hover:bg-opacity-20 px-8 py-4 rounded-lg font-medium text-center transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContactClick}
              >
                Contact Counsellor
              </motion.button>
            </motion.div>
          </div>

          {/* Image/illustration */}
          <div className="lg:w-1/2 flex justify-center">
            <motion.div 
              className="relative"
              variants={pulseVariants}
              animate="pulse"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 bg-green-800 rounded-full flex items-center justify-center">
                <div className="absolute inset-8 border-2 border-para border-opacity-30 rounded-full"></div>
                <div className="absolute inset-12 border-2 border-para border-opacity-20 rounded-full"></div>
                
                <div className="relative z-10 text-center p-6">
                  <FaBrain className="text-6xl md:text-7xl text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">Mental Wellness</h3>
                  <p className="text-gray-300 text-sm">Professional Support</p>
                </div>
              </div>
              
              {/* Floating elements around the circle */}
              <motion.div 
                className="absolute -top-4 -left-4 bg-dark-400 p-3 rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaHandHoldingHeart className="text-para text-xl" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-dark-400 p-3 rounded-full shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <FaHeart className="text-para text-xl" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Contact Options Modal */}
      {showContactOptions && (
        <ContactOptionsModal 
          onSelectOption={setSelectedOption} 
          onClose={closeContactModal} 
        />
      )}

      {/* WhatsApp Redirect Modal */}
      {selectedOption === 'whatsapp' && (
        <WhatsAppModal 
          phoneNumber={+254727533905} 
          message={whatsappMessage}
          onClose={closeContactModal}
        />
      )}

      {/* Contact Form Modal */}
      {selectedOption === 'website' && (
        <ContactFormModal 
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleFormSubmit}
          onClose={closeContactModal}
        />
      )}

      {/* Scrolling indicator */}
      <ScrollIndicator />
    </section>
  );
};

// Reusable Modal Components
const ContactOptionsModal = ({ onSelectOption, onClose }) => (
  <ModalWrapper>
    <h3 className="text-xl font-bold mb-4">Contact Counsellor</h3>
    <p className="mb-6">Choose how you'd like to contact the counsellor:</p>
    
    <div className="space-y-4">
      <ModalButton 
        icon={<FaWhatsapp className="text-xl" />}
        text="Via WhatsApp"
        color="bg-green-600 hover:bg-green-700"
        onClick={() => onSelectOption('whatsapp')}
      />
      
      <ModalButton 
        icon={<FaHandHoldingHeart className="text-xl" />}
        text="Via Website Form"
        color="bg-dark-300 hover:bg-dark-200"
        onClick={() => onSelectOption('website')}
      />
    </div>
    
    <ModalCloseButton onClose={onClose} />
  </ModalWrapper>
);

const WhatsAppModal = ({ phoneNumber, message, onClose }) => (
  <ModalWrapper>
    <h3 className="text-xl font-bold mb-4">Redirecting to WhatsApp</h3>
    <p className="mb-6">You'll be redirected to WhatsApp to continue your conversation with our counsellor.</p>
    
    <div className="flex gap-4">
      <ModalButton 
        icon={<FaWhatsapp className="text-xl" />}
        text="Continue to WhatsApp"
        color="bg-green-600 hover:bg-green-700"
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        onClick={onClose}
      />
      
      <ModalButton 
        text="Cancel"
        color="bg-dark-300 hover:bg-dark-200"
        onClick={onClose}
      />
    </div>
  </ModalWrapper>
);

const ContactFormModal = ({ formData, onChange, onSubmit, onClose }) => (
  <ModalWrapper>
    <h3 className="text-xl font-bold mb-4">Contact Counsellor</h3>
    <p className="mb-6">Fill out this form and our counsellor will get back to you shortly.</p>
    
    <form onSubmit={onSubmit}>
      <FormInput 
        label="Your Name"
        id="name"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
      />
      
      <FormInput 
        label="Your Email"
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        required
      />
      
      <FormTextarea 
        label="Your Message"
        id="message"
        name="message"
        value={formData.message}
        onChange={onChange}
        required
      />
      
      <div className="flex gap-4">
        <ModalButton 
          type="submit"
          text="Send Message"
          color="bg-para hover:bg-green-700"
          className="flex-1"
        />
        
        <ModalButton 
          type="button"
          text="Cancel"
          color="bg-dark-300 hover:bg-dark-200"
          className="flex-1"
          onClick={onClose}
        />
      </div>
    </form>
  </ModalWrapper>
);

// Reusable UI Components
const ModalWrapper = ({ children }) => (
  <motion.div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div 
      className="bg-dark-400 p-8 rounded-lg max-w-md w-full"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const ModalButton = ({ icon, text, color, onClick, href, type = "button", className = "" }) => {
  const buttonClass = `${color} text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 ${className}`;
  
  return href ? (
    <motion.a
      href={href}
      className={buttonClass}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {icon}
      {text}
    </motion.a>
  ) : (
    <motion.button
      type={type}
      className={buttonClass}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {icon}
      {text}
    </motion.button>
  );
};

const ModalCloseButton = ({ onClose }) => (
  <button 
    className="mt-6 text-gray-400 hover:text-white"
    onClick={onClose}
  >
    Cancel
  </button>
);

const FormInput = ({ label, id, type = "text", name, value, onChange, required }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2">{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-dark-300 border border-dark-200 rounded-lg py-2 px-4 text-white"
      required={required}
    />
  </div>
);

const FormTextarea = ({ label, id, name, value, onChange, required }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block mb-2">{label}</label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full bg-dark-300 border border-dark-200 rounded-lg py-2 px-4 text-white"
      required={required}
    />
  </div>
);

const ScrollIndicator = () => (
  <motion.div 
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <a href="#services" className="text-gray-400 hover:text-para transition-colors">
      <FaArrowDown className="text-2xl" />
    </a>
  </motion.div>
);

export default HeroSection;