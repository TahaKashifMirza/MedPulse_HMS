import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth"; // Import the useAuth hook to manage authentication state
import "../CSS/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, LogoutUser } = useAuth(); // Get isLoggedIn and LogoutUser from AuthContext

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="navbar-main">
      <div className="navbar-container">
        {/* Logo and Brand */}
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-logo">
            <img src="/Images/Logo2.png" alt="Logo" className="navbar-logo-image" />
          </NavLink>
          <div>
            <NavLink to="/" className="navbar-name">
              MedPulse
            </NavLink>
            <p className="navbar-slogan">Where Care Meets Innovations</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className={`navbar-links ${menuOpen ? "show-menu" : ""}`}>
          <NavLink to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/doctorlist" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Doctor List
          </NavLink>
          <NavLink to="/appointment" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Appointment
          </NavLink>
          <NavLink to="/contact" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Contact Us
          </NavLink>


          {/* Conditional Login/Logout Button */}
          {isLoggedIn ? (
            <NavLink to="/logout"
              className="navbar-login"
              onClick={() => {
                LogoutUser(); // Log out the user
              }}
            >
              LOGOUT
              </NavLink>
          ) : (
            <NavLink to="/login" className="navbar-login" onClick={() => setMenuOpen(false)}>
              LOGIN
              </NavLink>
          )}
        </nav>

        {/* Hamburger Menu */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          {menuOpen ? <span className="close-icon">✖</span> : <span className="menu-icon">☰</span>}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
