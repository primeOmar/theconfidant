import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGavel, FaUserCheck, FaExclamationTriangle, FaFileContract } from 'react-icons/fa';

const TermsOfServiceModal = ({ isOpen, onClose }) => {
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
                <FaFileContract className="text-para text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-dark-500">Terms of Service</h2>
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
                {/* Introduction */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaGavel className="text-para mr-2" />
                    Acceptance of Terms
                  </h3>
                  <p className="text-gray-600 mb-4">
                    By accessing or using The Confidant counseling services, you agree to comply with these Terms of Service. 
                    If you disagree with any part, you may not use our services.
                  </p>
                </section>

                {/* Service Description */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">1. Service Overview</h3>
                  <p className="text-gray-600 mb-2">
                    The Confidant provides:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4">
                    <li>Online counseling sessions with licensed professionals</li>
                    <li>Anonymous chat support</li>
                    <li>Mental health self-assessment tools</li>
                    <li>Educational resources</li>
                  </ul>
                  <p className="text-gray-600">
                    <strong>Note:</strong> Our services do not replace emergency medical care. In crisis situations, contact local emergency services immediately.
                  </p>
                </section>

                {/* User Responsibilities */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaUserCheck className="text-para mr-2" />
                    2. User Responsibilities
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Provide accurate information during registration</li>
                    <li>Maintain confidentiality of your account credentials</li>
                    <li>Use services only for lawful purposes</li>
                    <li>Not impersonate others or provide false health information</li>
                    <li>Respect counselor boundaries and professional ethics</li>
                  </ul>
                </section>

                {/* Payments & Cancellations */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">3. Payments & Cancellations</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Session Fees</h4>
                      <p className="text-sm text-gray-600">
                        Fees are displayed before booking. We accept MPESA and credit/debit cards.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Cancellations</h4>
                      <p className="text-sm text-gray-600">
                        Cancel at least 24 hours before sessions for full refunds. Late cancellations incur fees.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Limitations */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaExclamationTriangle className="text-para mr-2" />
                    4. Limitations of Service
                  </h3>
                  <p className="text-gray-600 mb-2">
                    The Confidant does not:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Provide emergency crisis intervention</li>
                    <li>Issue official medical diagnoses</li>
                    <li>Prescribe medication</li>
                    <li>Guarantee specific treatment outcomes</li>
                  </ul>
                </section>

                {/* Termination */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">5. Account Termination</h3>
                  <p className="text-gray-600">
                    We reserve the right to suspend accounts for violations of these terms, with notice where appropriate.
                  </p>
                </section>

                {/* Changes to Terms */}
                <section>
                  <h3 className="text-xl font-semibold mb-4">6. Modifications</h3>
                  <p className="text-gray-600">
                    Terms may be updated periodically. Continued use after changes constitutes acceptance.
                  </p>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white p-6 border-t flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-3 sm:mb-0">
                Effective: {new Date().toLocaleDateString()}
              </p>
              <button
                onClick={onClose}
                className="bg-para hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                I Agree
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsOfServiceModal;