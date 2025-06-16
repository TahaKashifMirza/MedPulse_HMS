import React, { useState } from 'react';
import '../CSS/Footer.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

function Footer() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <footer className="footer-main">
      <div className="footer-main-container">
        {/* Column 1: Logo */}
        <div className="footer-main-col">
        <img src="/Images/Logo2.png" alt="MedPulse Logo" />
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-main-col">
          <h3 className="footer-main-heading">Quick Links</h3>
          <ul className="footer-main-menu">
            {["Home", "MedPulse Doctor List", "Book Your Appointment", "Contact MedPulse"].map((item, index) => (
              <li key={index} className="footer-main-menu-item">
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="footer-main-col">
          <h3 className="footer-main-heading">Social Media</h3>
          <div className="footer-main-social-icons">
            <FaFacebook className="footer-main-icon" />
            <FaInstagram className="footer-main-icon" />
            <FaTiktok className="footer-main-icon" />
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="footer-main-subscribe">
        <h3 className="footer-main-subscribe-heading">Subscribe to our emails</h3>
        <div className={`footer-main-input-container ${isFocused ? 'focused' : ''}`}>
          <label htmlFor="email" className="footer-main-label">Email:</label>
          <input
            type="email"
            id="email"
            className="footer-main-input"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button className="footer-main-send-btn">
            <IoSend />
          </button>
        </div>
      </div>

      {/* Bottom Text */}
      <hr className="footer-main-divider" />
      <p className="footer-main-bottom-text">© Copyright MedPulse 2025. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
