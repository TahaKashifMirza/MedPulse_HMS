// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DoctorList from './pages/DoctorList';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import LoginSignupForm from './pages/LoginSignupForm';
import { Logout } from './pages/Logout';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctorlist" element={<DoctorList />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginSignupForm />} />
      <Route path="/logout" element={<Logout />} />
      </Routes>
      
    </Router>
  );
}

export default App;