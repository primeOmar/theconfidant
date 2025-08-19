import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaLock, FaShieldAlt, FaUserShield, FaDatabase } from 'react-icons/fa';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <div className="flex items-center">
                <FaLock className="text-para text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-dark-500">Privacy Policy</h2>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-dark-500 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="prose max-w-none">
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaShieldAlt className="text-para mr-2" />
                    Introduction
                  </h3>
                  <p className="text-gray-600 mb-4">
                    At The Confidant, we are committed to protecting your privacy and ensuring the confidentiality of your mental health information. This policy outlines how we collect, use, and safeguard your personal data.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaUserShield className="text-para mr-2" />
                    Information We Collect
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Personal identification information (name, email, phone number)</li>
                    <li>Demographic information (age, gender when relevant to therapy)</li>
                    <li>Health information you provide during counseling sessions</li>
                    <li>Payment information (processed securely through MPESA)</li>
                    <li>Usage data and cookies for website analytics</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaDatabase className="text-para mr-2" />
                    How We Use Your Information
                  </h3>
                  <p className="text-gray-600 mb-2">We use your data to:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Provide and personalize our counseling services</li>
                    <li>Process payments and maintain records</li>
                    <li>Improve our platform and services</li>
                    <li>Communicate important updates</li>
                    <li>Ensure compliance with legal obligations</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Confidentiality & Security</h3>
                  <p className="text-gray-600 mb-4">
                    We implement industry-standard security measures including:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">End-to-End Encryption</h4>
                      <p className="text-sm text-gray-600">All communications are encrypted to protect your sensitive information.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Access Controls</h4>
                      <p className="text-sm text-gray-600">Strict access limitations to protect your data from unauthorized viewing.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Data Minimization</h4>
                      <p className="text-sm text-gray-600">We only collect what's necessary for providing our services.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Regular Audits</h4>
                      <p className="text-sm text-gray-600">Our systems undergo regular security assessments.</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Note: We may break confidentiality only if required by law or if there's imminent risk of harm to yourself or others.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Your Rights</h3>
                  <p className="text-gray-600 mb-2">You have the right to:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Access your personal information</li>
                    <li>Request corrections to inaccurate data</li>
                    <li>Request deletion of your data (with some legal exceptions)</li>
                    <li>Withdraw consent for data processing</li>
                    <li>Receive a copy of your data in a portable format</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">Changes to This Policy</h3>
                  <p className="text-gray-600">
                    We may update this policy periodically. Significant changes will be communicated through our platform or via email.
                  </p>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white p-6 border-t flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-3 sm:mb-0">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <button
                onClick={onClose}
                className="bg-para hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Example usage in your component:
const FooterWithModal = () => {
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <footer>
      {/* Your existing footer content */}
      
      <button 
        onClick={() => setPrivacyModalOpen(true)}
        className="text-gray-400 hover:text-para text-sm transition-colors"
      >
        Privacy Policy
      </button>

      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setPrivacyModalOpen(false)} 
      />
    </footer>
  );
};

export default PrivacyPolicyModal;