import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Form.css';

const GrievanceForm = () => {
  const formRef = useRef(); // Required for EmailJS
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    modeOfTransport: '',
    travelDate: '',
    flightNumber: '',
    seatNumber: '',
    pnrNumber: '',
    complaintDescription: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // success or error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Send email via EmailJS`
   emailjs.sendForm(
  'service_1nmbyuv',
  'template_cjjtzqs',
  formRef.current,
  '0pyU7UeQWb01HqC1G'
)
      .then((result) => {
        console.log('Email sent successfully!', result.text);
        setSubmitStatus('success');
        alert('Complaint submitted successfully! We will get back to you soon.');
        
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          address: '',
          modeOfTransport: '',
          travelDate: '',
          flightNumber: '',
          seatNumber: '',
          pnrNumber: '',
          complaintDescription: ''
        });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setSubmitStatus('error');
        alert('Failed to submit complaint. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="grievance-container">
      <div className="form-header">
        <div className="logo-section">
          <img
            src="/Bidhannagar_Police_logo.png"
            alt="Bidhannagar Police Logo"
            className="police-logo"
          />
        </div>
        <div className="header-title">
          <h1>Public Grievance Redressal System</h1>
          <h2>NSCBI Airport</h2>
        </div>
      </div>

      <form ref={formRef} className="grievance-form" onSubmit={handleSubmit}>
        {/* Hidden inputs for EmailJS template variables (optional, if needed) */}
        <input type="hidden" name="to_name" value="Bidhannagar Airport Police" />
        <input type="hidden" name="from_name" value={`${formData.firstName} ${formData.lastName}`} />
        <input type="hidden" name="reply_to" value={formData.email} />

        <div className="form-section">
          <h3>Submit Your Details</h3>

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number of Passenger *</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              required
            />
          </div>

          <div className="form-group">
            <label>Email ID *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mode of Transport *</label>
              <select name="modeOfTransport" value={formData.modeOfTransport} onChange={handleChange} required>
                <option value="">Select Mode</option>
                <option value="Flight">Flight</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Travel</label>
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Flight Number</label>
              <input
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                placeholder="e.g. AI-401"
              />
            </div>
            <div className="form-group">
              <label>Seat Number</label>
              <input
                type="text"
                name="seatNumber"
                value={formData.seatNumber}
                onChange={handleChange}
                placeholder="e.g. 12A"
              />
            </div>
          </div>

          <div className="form-group">
            <label>PNR No.</label>
            <input
              type="text"
              name="pnrNumber"
              value={formData.pnrNumber}
              onChange={handleChange}
              placeholder="Enter PNR (if available)"
            />
          </div>

          <div className="form-group">
            <label>Describe Your Complaint *</label>
            <textarea
              name="complaintDescription"
              value={formData.complaintDescription}
              onChange={handleChange}
              placeholder="Please describe your issue in detail..."
              rows="6"
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>

          {submitStatus === 'success' && (
            <p style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>
              Your complaint has been submitted successfully!
            </p>
          )}
          {submitStatus === 'error' && (
            <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
              Submission failed. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default GrievanceForm;