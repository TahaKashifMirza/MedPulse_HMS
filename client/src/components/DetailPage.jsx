import React from "react";
import "../CSS/DetailPage.css";

const DetailPage = () => {
  return (
    <div className="detailpage-main-container">
      <div className="detailpage-main-content">
        {/* Left Side Content */}
        <div className="detailpage-main-left">
          <h1 className="detailpage-main-heading">
            We help patients live a healthy, longer life.
          </h1>
          <p className="detailpage-main-description">
          <strong>MedPulse</strong> mission is to empower individuals to lead healthier and longer lives by providing exceptional care, treatments, and a compassionate approach. With decades of experience and a network of clinics worldwide, we ensure that every patient receives personalized and top-notch healthcare services.
          </p>
          <div className="detailpage-main-analytics">
            <div className="detailpage-main-analytic-item">
              <h2 className="detailpage-main-number">30+</h2>
              <p className="detailpage-main-analytic-description">
                Years of Experience
              </p>
            </div>
            <div className="detailpage-main-analytic-item">
              <h2 className="detailpage-main-number">15+</h2>
              <p className="detailpage-main-analytic-description">
                Clinic Location
              </p>
            </div>
            <div className="detailpage-main-analytic-item">
              <h2 className="detailpage-main-number">100%</h2>
              <p className="detailpage-main-analytic-description">
                Patient Satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="detailpage-main-right">
          <div className="detailpage-main-images">
            <div className="detailpage-main-large-image">
              <img
                src="/Images/d1.jpeg"
                alt="Large Image"
                className="detailpage-main-image"
              />
            </div>
            <div className="detailpage-main-small-images">
              <img
                src="/Images/d2.jpeg"
                alt="Small Image 1"
                className="detailpage-main-image"
              />
              <img
                src="/Images/d3.jpeg"
                alt="Small Image 2"
                className="detailpage-main-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
