// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
// import AdminPannelNavbar from './components/AdminPannelNavbar';
import AdminPannelLogin from './pages/AdminPannelLogin';
import AdminPannelRegister from './pages/AdminPannelRegister';
import AdminRegisterDoctor from './pages/AdminRegisterDoctor';
import AdminAppointment from './pages/AdminAppointment';
import AdminPannelContact from './pages/AdminPannelContact';
import AdminDoctorList from './pages/AdminDoctorList';
import { AdminPannelLogout } from './pages/AdminPannelLogout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to the admin login page by default */}
        <Route path="/" element={<Navigate to="/admin-login" />} />
        <Route path="/admin-registerdoctor" element={<AdminRegisterDoctor />} />
        <Route path="/admin-login" element={<AdminPannelLogin />} />
        <Route path="/admin-logout" element={<AdminPannelLogout />} />
        <Route path="/admin-messages" element={<AdminPannelContact />} />
        <Route path="/admin-doctorlist" element={<AdminDoctorList />} />
        <Route path="/admin-appointment" element={<AdminAppointment />} />
        {/* <Route path="/admin-navbar" element={<AdminPannelNavbar />} /> */}
        <Route path="/admin-register" element={<AdminPannelRegister />} />
        <Route path="/admin-home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
