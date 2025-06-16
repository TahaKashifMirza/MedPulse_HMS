import React from 'react';
import '../CSS/Hero.css'; // Import the CSS file

const Hero = () => {
  return (
    <section className="hero-main">
      <div className="hero-left">
        <h1 className="hero-main-heading">Welcome to MedPulse</h1>
        <p className="hero-subheading">Where Care Meets Innovations</p>
        <p className="hero-description">
          At <strong>MedPulse,</strong> we combine the latest technology with compassionate care to provide patients with the highest quality healthcare services. Our team of expert doctors is here to ensure that your health is in safe hands, providing personalized treatments tailored to your needs.
        </p>
        <a href="/appointment" className="hero-cta-btn">GET YOUR APPOINTMENT</a>
      </div>
      <div className="hero-right">
        <div className="hero-image-container">
          <img src="/Images/Logo2.png" alt="Hospital" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
