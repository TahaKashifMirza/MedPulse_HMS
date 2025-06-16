import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/MedicalServices.css"; // Assuming a separate CSS file for styling

const MedicalServices = () => {
  return (
    <div className="medicalservices-main-container">
      {/* Main Heading and Slogan */}
      <header className="medicalservices-main-header">
        <h1 className="medicalservices-main-heading">MedPulse Medical Services</h1>
        <p className="medicalservices-main-slogan">Where Care Meets Innovations</p>
      </header>

      {/* Services Grid */}
      <div className="medicalservices-main-grid">
        {/* Container 1 */}
        <div className="medicalservices-container">
          <h2 className="medicalservices-container-heading">Cancer Care</h2>
          <p className="medicalservices-container-description">
            Comprehensive oncology treatments and personalized patient care.
          </p>
          <NavLink to="/appointment" className="medicalservices-container-link">
            <span>Get Your Appointment Now</span>
            <i className="medicalservices-arrow">&rarr;</i>
          </NavLink>
        </div>

        {/* Container 2 */}
        <div className="medicalservices-container">
          <h2 className="medicalservices-container-heading">Cardiology</h2>
          <p className="medicalservices-container-description">
            Advanced heart care with state-of-the-art technology.
          </p>
          <NavLink to="/appointment" className="medicalservices-container-link">
            <span>Get Your Appointment Now</span>
            <i className="medicalservices-arrow">&rarr;</i>
          </NavLink>
        </div>

        {/* Container 3 */}
        <div className="medicalservices-container">
          <h2 className="medicalservices-container-heading">Pediatrics</h2>
          <p className="medicalservices-container-description">
            Compassionate care for your child’s health and well-being.
          </p>
          <NavLink to="/appointment" className="medicalservices-container-link">
            <span>Get Your Appointment Now</span>
            <i className="medicalservices-arrow">&rarr;</i>
          </NavLink>
        </div>

        {/* Container 4 */}
        <div className="medicalservices-container">
          <h2 className="medicalservices-container-heading">Orthopedics</h2>
          <p className="medicalservices-container-description">
            Excellence in bone and joint care with expert specialists.
          </p>
          <NavLink to="/appointment" className="medicalservices-container-link">
            <span>Get Your Appointment Now</span>
            <i className="medicalservices-arrow">&rarr;</i>
          </NavLink>
        </div>

        {/* Container 5 */}
        <div className="medicalservices-container">
          <h2 className="medicalservices-container-heading">Neurology</h2>
          <p className="medicalservices-container-description">
            Leading-edge treatments for brain and nervous system disorders.
          </p>
          <NavLink to="/appointment" className="medicalservices-container-link">
            <span>Get Your Appointment Now</span>
            <i className="medicalservices-arrow">&rarr;</i>
          </NavLink>
        </div>

        {/* Container 6 */}
        <div className="medicalservices-container">
          <h2 className="medicalservices-container-heading">Dermatology</h2>
          <p className="medicalservices-container-description">
            Comprehensive skin care for all your dermatological needs.
          </p>
          <NavLink to="/appointment" className="medicalservices-container-link">
            <span>Get Your Appointment Now</span>
            <i className="medicalservices-arrow">&rarr;</i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MedicalServices;
