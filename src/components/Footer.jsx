import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TermsOfServiceModal from './TermsOfServiceModal';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaHeart
} from 'react-icons/fa';
import PrivacyPolicyModal from './PrivacyPolicyModal';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTOS, setShowTOS] = useState(false);
  

  return (
    <footer className="bg-dark-500 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaHeart className="text-para mr-2" />
              The Confidant
            </h3>
            <p className="text-gray-300 mb-4">
              Providing accessible, confidential mental health support across Africa. 
              Your journey to wellness starts here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-para transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-para transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-para transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-para transition-colors">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-para transition-colors">Services</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-para transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-para transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-para transition-colors">Anonymous Chat</a></li>
              <li><a href="#" className="text-gray-300 hover:text-para transition-colors">1-on-1 Counseling</a></li>
              <li><a href="#" className="text-gray-300 hover:text-para transition-colors">Self-Assessment Tests</a></li>
              <li><a href="#" className="text-gray-300 hover:text-para transition-colors">Group Therapy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-para transition-colors">Educational Videos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-para transition-colors">Blog Articles</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaPhone className="text-para mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+254 700 123 456</p>
                  <p className="text-gray-400 text-sm">24/7 Helpline</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-para mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">support@confidant.com</p>
                  <p className="text-gray-400 text-sm">Response within 24hrs</p>
                </div>
              </li>
             
              
            </ul>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          <div className="flex items-center bg-dark-400 px-4 py-2 rounded-lg">
            <FaShieldAlt className="text-para mr-2" />
            <span>100% Confidential</span>
          </div>
          <div className="flex items-center bg-dark-400 px-4 py-2 rounded-lg">
            <FaHeart className="text-para mr-2" />
            <span>Licensed Professionals</span>
          </div>
          <div className="flex items-center bg-dark-400 px-4 py-2 rounded-lg">
            <FaShieldAlt className="text-para mr-2" />
            <span>Secure Platform</span>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm mb-4 md:mb-0"
          >
            © {currentYear} The Confidant. All rights reserved.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
        whileHover={{ scale: 1.05 }}
        className="text-gray-400 hover:text-green-600 text-sm transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        Privacy Policy
      </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-gray-400 hover:text-para text-sm transition-colors"
                onClick={() => setShowTOS(true)}
            >
              Terms of Service
            </motion.button>
            
           
            <PrivacyPolicyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
         />
        <TermsOfServiceModal 
        isOpen={showTOS} 
        onClose={() => setShowTOS(false)}
      />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;