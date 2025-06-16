import React from 'react';
import '../CSS/AdminHeroSection.css';

const AdminHeroSection = () => {
  return (
    <div className="admin-hero-container">
      <div className="admin-hero-content">
        <img
          src="/Images/Logo2.png"
          alt="MedPulse Logo"
          className="admin-hero-logo"
        />
        <h1 className="admin-hero-heading">
          Welcome to MedPulse Admin Panel
        </h1>
        <p className="admin-hero-paragraph">
          MedPulse is a Hospital Management System that revolutionizes the way healthcare organizations manage their daily operations. From patient records to staff management, MedPulse streamlines processes with cutting-edge technology, providing healthcare professionals with the tools they need to deliver exceptional care. Where care meets innovation, MedPulse ensures a seamless and efficient experience for both patients and administrators.
        </p>
      </div>
    </div>
  );
};

export default AdminHeroSection;
