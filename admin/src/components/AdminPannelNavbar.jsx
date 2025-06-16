import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/AdminPannelNavbar.css";

const AdminPannelNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Check if the token is stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const LogoutAdmin = () => {
    localStorage.removeItem("token"); // Remove token from localStorage on logout
    setIsLoggedIn(false); // Update isLoggedIn state
  };

  return (
    <header className="admin-navbar-main">
      <div className="admin-navbar-container">
        {/* Logo and Brand */}
        <div className="admin-navbar-brand">
          <NavLink to="/admin-home" className="admin-navbar-logo">
            <img src="/Images/Logo2.png" alt="Logo" className="admin-navbar-logo-image" />
          </NavLink>
          <div>
            <NavLink to="/admin-home" className="admin-navbar-name">
              MedPulse ADMIN PANEL
            </NavLink>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className={`admin-navbar-links ${menuOpen ? "show-menu" : ""}`}>
          <NavLink to="/admin-home" className="admin-navbar-link" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/admin-doctorlist" className="admin-navbar-link" onClick={() => setMenuOpen(false)}>
            Doctor List
          </NavLink>
          <NavLink to="/admin-appointment" className="admin-navbar-link" onClick={() => setMenuOpen(false)}>
            Appointment
          </NavLink>
          <NavLink to="/admin-register" className="admin-navbar-link" onClick={() => setMenuOpen(false)}>
            Register Admin
          </NavLink>
          <NavLink to="/admin-registerdoctor" className="admin-navbar-link" onClick={() => setMenuOpen(false)}>
            Register Doctor
          </NavLink>
          <NavLink to="/admin-messages" className="admin-navbar-link" onClick={() => setMenuOpen(false)}>
            Messages
          </NavLink>

          {/* Conditional Login/Logout Button */}
          {isLoggedIn ? (
            <NavLink to="/admin-logout"
              className="admin-navbar-login"
              onClick={LogoutAdmin} // Log out the user
            >
              LOGOUT
            </NavLink>
          ) : (
            <NavLink to="/admin-login" className="admin-navbar-login" onClick={() => setMenuOpen(false)}>
              LOGIN
            </NavLink>
          )}
        </nav>

        {/* Hamburger Menu */}
        <div className="admin-navbar-hamburger" onClick={toggleMenu}>
          {menuOpen ? <span className="admin-navbar-close-icon">✖</span> : <span className="admin-navbar-menu-icon">☰</span>}
        </div>
      </div>
    </header>
  );
};

export default AdminPannelNavbar;
