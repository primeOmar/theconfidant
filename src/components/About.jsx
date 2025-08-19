import React from 'react';
import { motion } from 'framer-motion';
import { FaCommentDots, FaUsers, FaHeart, FaGlobeAfrica, FaUserShield, FaHandsHelping } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section className="py-16 bg-white" id="about">
      <div className="container mx-auto px-4">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-dark-500 p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center mb-4">
              <FaHeart className="text-red-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-white">
              "At the Confidant, we are committed to providing accessible, confidential, and professional counselling services 
              to individuals, families, and communities seeking mental wellness and emotional support."
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-dark-500 p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center mb-4">
              <FaGlobeAfrica className="text-green-700 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-white">
              "To normalize mental health support and become a leading online platform for healing, growth, 
              and empowerment across Africa and beyond."
            </p>
          </motion.div>
        </div>

        {/* Our Story */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-dark-500 mb-6">Our Story</h2>
          <p className="text-gray-600 text-lg">
            "The Confidant was born from a passion to bridge the gap between mental health professionals and people in need—especially 
            in places where access is limited or stigmatized. What began as a small initiative has grown into a trusted platform 
            serving thousands across the continent."
          </p>
        </motion.div>

        {/* What Makes Us Different */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-dark-500 mb-8 text-center">What Makes Us Different</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaUserShield className="text-4xl mb-4 text-dark-500" />,
                title: "Affordable & Confidential",
                text: "Professional help at accessible rates with strict privacy standards"
              },
              {
                icon: <FaCommentDots className="text-4xl mb-4 text-dark-500" />,
                title: "Anonymous Chat",
                text: "Get support without revealing your identity"
              },
              {
                icon: <FaUsers className="text-4xl mb-4 text-dark-500" />,
                title: "Role-Based Sessions",
                text: "Specialized support for students, couples, parents, and more"
              },
              {
                icon: <FaHandsHelping className="text-4xl mb-4 text-dark-500" />,
                title: "Local Integration",
                text: "Kenya-specific payment options including MPESA"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg text-center"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Approach */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-dark-500 bg-opacity-10 p-8 rounded-xl mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Therapeutic Approach</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Cognitive Behavioral Therapy (CBT)",
              "Talk Therapy",
              "Faith-Based Counselling",
              "Trauma-Informed Care",
              "Solution-Focused Therapy",
              "Mindfulness Techniques"
            ].map((approach, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-para text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  ✓
                </div>
                <p className="text-white">{approach}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-dark-500 mb-6">Ready to Begin Your Healing Journey?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#booking"
              className="bg-para hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium inline-block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Free Consultation
            </motion.a>
            <motion.a
              href="#team"
              className="border border-para text-black hover:bg-para hover:bg-opacity-10 px-8 py-4 rounded-lg font-medium inline-block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Meet Our Counsellors
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;