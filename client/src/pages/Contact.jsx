import React, { useState } from 'react';
import '../CSS/Contact.css';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      mobileNumber,
      message,
    };

    try {
      const response = await fetch('http://localhost:5001/api/form/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Your message has been sent!');  // Show success notification
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobileNumber('');
        setMessage('');
      } else {
        toast.error('Your message can\'t be sent. Please try again.');  // Show error notification
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');  // Show error notification
    }
  };

  return (
    <div className="contact-main-contactpage">
      <div className="contact-main-logo-container">
        <img src="/Images/Logo2.png" alt="Logo" className="contact-main-logo" />
      </div>

      <h2 className="contact-main-heading">Get in Touch with Us</h2>
      <p className="contact-main-description">We are here to assist you with your healthcare needs. Please fill out the form below, and our team will get back to you as soon as possible.</p>

      <form onSubmit={handleSubmit} className="contact-main-form">
        <div className="contact-main-input-container">
          <div className="contact-main-input-group">
            <label htmlFor="firstName" className="contact-main-label">First Name:</label>
            <input
              type="text"
              id="firstName"
              placeholder='Enter your first name...'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="contact-main-input"
              required
            />
          </div>

          <div className="contact-main-input-group">
            <label htmlFor="lastName" className="contact-main-label">Last Name:</label>
            <input
              type="text"
              id="lastName"
              placeholder='Enter your last name...'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="contact-main-input"
              required
            />
          </div>
        </div>

        <div className="contact-main-input-container">
          <div className="contact-main-input-group">
            <label htmlFor="email" className="contact-main-label">Email:</label>
            <input
              type="email"
              id="email"
              placeholder='Enter your valid email address...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="contact-main-input"
              required
            />
          </div>

          <div className="contact-main-input-group">
            <label htmlFor="mobileNumber" className="contact-main-label">Mobile Number:</label>
            <input
              type="text"
              id="mobileNumber"
              placeholder='Enter your mobile number...'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="contact-main-input"
              required
            />
          </div>
        </div>

        <div className="contact-main-input-group">
          <label htmlFor="message" className="contact-main-label">Message:</label>
          <textarea
            id="message"
            value={message}
            placeholder='Type your message here...'
            onChange={(e) => setMessage(e.target.value)}
            rows="6"
            className="contact-main-textarea"
            required
          />
        </div>

        <button type="submit" className="contact-main-btn">Send Message</button>
      </form>

      {/* Toast container to render the notifications */}
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default Contact;
