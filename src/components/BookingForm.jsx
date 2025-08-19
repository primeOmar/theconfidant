import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaStickyNote,
  FaMoneyBillWave,
  FaRedo,
  FaInfoCircle,
  FaCreditCard,
  FaMobileAlt
} from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    counsellor: '',
    date: null,
    timeSlot: '',
    notes: '',
    frequency: 'single',
    paymentMethod: 'mpesa',
    phoneNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [counsellors, setCounsellors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/counsellor');
        const data = await res.json();
        setCounsellors(data);
      } catch (error) {
        console.error('Failed to fetch counsellors:', error);
      }
    };
    fetchCounsellors();
  }, []);

  useEffect(() => {
    if (formData.date && formData.counsellor) {
      const fetchAvailability = async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/api/server?counsellor=${formData.counsellor}&date=${formData.date.toISOString()}`
          );
          const data = await res.json();
          setTimeSlots(data);
        } catch (error) {
          console.error('Failed to fetch availability:', error);
        }
      };
      fetchAvailability();
    }
  }, [formData.date, formData.counsellor]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.counsellor) newErrors.counsellor = 'Please select a counsellor';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
    if (formData.paymentMethod === 'mpesa' && !formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required for M-Pesa';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const paymentResponse = await processPayment();
      if (paymentResponse.success) {
        const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            date: formData.date.toISOString(),
            counsellorId: formData.counsellor
          })
        });

        if (bookingResponse.ok) {
          setFormData({
            counsellor: '',
            date: null,
            timeSlot: '',
            notes: '',
            frequency: 'single',
            paymentMethod: 'mpesa',
            phoneNumber: ''
          });
          setTimeSlots([]);
          setSelectedCounsellor(null);
          alert('Booking confirmed! Check your email for details.');
        }
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const processPayment = async () => {
    if (formData.paymentMethod === 'mpesa') {
      return await fetch('/api/mpesa-payment', {
        method: 'POST',
        body: JSON.stringify({
          phone: formData.phoneNumber,
          amount: selectedCounsellor?.sessionPrice || 1500
        })
      });
    } else {
      return { success: true };
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'date' ? { timeSlot: '' } : {})
    }));

    if (name === 'counsellor') {
      const Counsellor = counsellors.find((c) => c._id === value);
      setSelectedCounsellor(counsellor);
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex min-h-[600px]">
        <AnimatePresence>
          {(selectedCounsellor || window.innerWidth > 768) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="md:w-1/3 bg-dark-500 p-6 border-r"
            >
              {selectedCounsellor ? (
                <>
                  <div className="text-center">
                    <img
                      src={selectedCounsellor.image || '/default-avatar.jpg'}
                      alt={selectedCounsellor.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                    />
                    <h3 className="text-xl font-bold text-gray-800">{selectedCounsellor.name}</h3>
                    <p className="text-blue-600">{selectedCounsellor.specialization}</p>
                    <div className="mt-2 bg-blue-100 text-blue-800 py-1 px-3 rounded-full inline-block text-sm font-medium">
                      KSh {selectedCounsellor.sessionPrice ?? '1,500'} / session
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-700">About</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaInfoCircle className="mr-1" />
                        {selectedCounsellor.experience || '5+'} years experience
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{selectedCounsellor.bio || 'No bio available'}</p>
                    <h4 className="font-semibold mt-5 mb-2 text-gray-700">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCounsellor.specialties?.map((s) => (
                        <span key={s} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-semibold mt-5 mb-2 text-gray-700">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCounsellor.languages?.map((l) => (
                        <span key={l} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <FaUser className="text-4xl mb-3" />
                  <p>Select a counsellor to view their profile</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Booking Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-2/3 p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Book a Counseling Session</h2>
          <p className="text-gray-600 mb-6">Fill in the details below to schedule your session</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Counsellor Selection */}
            <div>
              <label className="block text-gray-700 mb-2 flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                Select Counsellor
              </label>
              <select
                value={formData.counsellor}
                onChange={(e) => handleChange('counsellor', e.target.value)}
                className={`w-full p-3 border ${errors.counsellor ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                required
              >
                <option value="">-- Choose a counsellor --</option>
                {counsellors.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.specialization}) - KSh {c.sessionPrice || '1,500'}
                  </option>
                ))}
              </select>
              {errors.counsellor && <p className="mt-1 text-sm text-red-600">{errors.counsellor}</p>}
            </div>

            {/* Recurring Session Option */}
            <div>
              <label className="block text-gray-700 mb-2 flex items-center">
                <FaRedo className="mr-2 text-blue-600" />
                Session Frequency
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'single', label: 'Single Session' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'biweekly', label: 'Bi-Weekly' },
                  { value: 'monthly', label: 'Monthly' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="frequency"
                      value={option.value}
                      checked={formData.frequency === option.value}
                      onChange={() => handleChange('frequency', option.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-gray-700 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                Select Date
              </label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => handleChange('date', date)}
                minDate={new Date()}
                filterDate={(date) => {
                  // Filter weekends and counsellor's unavailable days
                  const day = date.getDay();
                  return day !== 0 && day !== 6; // Add more filters based on counsellor availability
                }}
                className={`w-full p-3 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholderText="Choose a date"
                required
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>

            {/* Real-time Time Slot Selection */}
            {formData.date && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-gray-700 mb-2 flex items-center">
                  <FaClock className="mr-2 text-blue-600" />
                  Available Time Slots
                </label>
                {timeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <motion.button
                        key={slot.time}
                        type="button"
                        onClick={() => handleChange('timeSlot', slot.time)}
                        className={`p-3 border rounded-lg text-center transition-all ${
                          formData.timeSlot === slot.time
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : slot.available
                              ? 'border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!slot.available}
                        whileHover={{ scale: slot.available ? 1.03 : 1 }}
                      >
                        {slot.time}
                        {!slot.available && <span className="block text-xs mt-1">Booked</span>}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                    {formData.counsellor ? 'Loading availability...' : 'Select a counsellor first'}
                  </div>
                )}
                {errors.timeSlot && <p className="mt-1 text-sm text-red-600">{errors.timeSlot}</p>}
              </motion.div>
            )}

            {/* Payment Section */}
            <div className="border-t pt-4">
              <button
                type="button"
                onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                className="flex items-center justify-between w-full text-left mb-2"
              >
                <div className="flex items-center">
                  <FaMoneyBillWave className="mr-2 text-blue-600" />
                  <span className="font-medium text-gray-700">Payment Details</span>
                </div>
                {showPaymentDetails ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              
              <AnimatePresence>
                {showPaymentDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 mt-2">
                      {/* Payment Method */}
                      <div>
                        <label className="block text-gray-700 mb-2">Payment Method</label>
                        <div className="grid grid-cols-2 gap-3">
                          <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="mpesa"
                              checked={formData.paymentMethod === 'mpesa'}
                              onChange={() => handleChange('paymentMethod', 'mpesa')}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex items-center">
                              <FaMobileAlt className="mr-2 text-green-600" />
                              <span>M-Pesa</span>
                            </div>
                          </label>
                          <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="card"
                              checked={formData.paymentMethod === 'card'}
                              onChange={() => handleChange('paymentMethod', 'card')}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex items-center">
                              <FaCreditCard className="mr-2 text-blue-400" />
                              <span>Card</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Phone Number for M-Pesa */}
                      {formData.paymentMethod === 'mpesa' && (
                        <div>
                          <label className="block text-gray-700 mb-2">M-Pesa Phone Number</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500">+254</span>
                            </div>
                            <input
                              type="tel"
                              value={formData.phoneNumber}
                              onChange={(e) => handleChange('phoneNumber', e.target.value)}
                              placeholder="712 345 678"
                              className={`pl-14 w-full p-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                            />
                          </div>
                          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                          <p className="mt-1 text-sm text-gray-500">
                            You'll receive an M-Pesa prompt to complete payment
                          </p>
                        </div>
                      )}

                      {/* Card Payment Fields */}
                      {formData.paymentMethod === 'card' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-gray-700 mb-2">Card Number</label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-gray-700 mb-2">Expiry Date</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-2">CVV</label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-gray-700 mb-2 flex items-center">
                <FaStickyNote className="mr-2 text-blue-600" />
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                rows="3"
                placeholder="Any specific concerns or preferences you'd like to share with your counsellor?"
              />
            </div>

            {/* Summary and Submit Button */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between mb-3">
                <span className="text-gray-700">Session Fee:</span>
                <span className="font-medium">
                  KSh {selectedCounsellor?.sessionPrice || '1,500'}
                </span>
              </div>
              {formData.frequency !== 'single' && (
                <div className="flex justify-between mb-3">
                  <span className="text-gray-700">Frequency:</span>
                  <span className="font-medium capitalize">{formData.frequency}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg text-blue-800 pt-2 border-t border-blue-200">
                <span>Total:</span>
                <span>KSh {selectedCounsellor?.sessionPrice || '1,500'}</span>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !formData.counsellor || !formData.date || !formData.timeSlot || (formData.paymentMethod === 'mpesa' && !formData.phoneNumber)}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white ${
                isSubmitting ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Confirm Booking (KSh ${selectedCounsellor?.sessionPrice || '1,500'})`
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingForm;