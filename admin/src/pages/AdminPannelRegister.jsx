import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/AdminPannelRegister.css';

const AdminPannelRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      firstName,
      lastName,
      email,
      contactNo,
      nic,
      dob,
      gender,
      password,
      role,
    };

    try {
      const response = await fetch('http://localhost:5001/api/admins/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Admin Registered Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Clear form after successful registration
        setFirstName('');
        setLastName('');
        setEmail('');
        setContactNo('');
        setNic('');
        setDob('');
        setGender('');
        setPassword('');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Registration Failed', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      toast.error('Registration Failed - Server Error', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="admin-register-container">
      <ToastContainer />
      <div className="admin-register-box">
        <img src="/Images/Logo2.png" alt="Logo" className="admin-register-logo" />
        <h1 className="admin-register-heading">REGISTER NOW AS ADMIN</h1>
        <p className="admin-register-paragraph">Only Admins Are Allowed To Register</p>
        <form onSubmit={handleSubmit} className="admin-register-form">
          <div className="admin-register-input-group">
            <label htmlFor="firstName" className="admin-register-label">First Name:</label>
            <input 
              type="text" 
              id="firstName" 
              placeholder='Enter your first name...'
              className="admin-register-input" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              required
            />
          </div>
          <div className="admin-register-input-group">
            <label htmlFor="lastName" className="admin-register-label">Last Name:</label>
            <input 
              type="text" 
              id="lastName" 
              placeholder='Enter your last name...'
              className="admin-register-input" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              required
            />
          </div>
          <div className="admin-register-input-group">
            <label htmlFor="email" className="admin-register-label">Email:</label>
            <input 
              type="email" 
              id="email" 
              placeholder='Enter your valid email address...'
              className="admin-register-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="admin-register-input-group">
            <label htmlFor="contactNo" className="admin-register-label">Contact No:</label>
            <input 
              type="text" 
              id="contactNo" 
              placeholder='Enter your 11 digit contact number...'
              className="admin-register-input" 
              value={contactNo} 
              onChange={(e) => setContactNo(e.target.value)} 
              required
            />
          </div>
          <div className="admin-register-input-group">
            <label htmlFor="nic" className="admin-register-label">NIC:</label>
            <input 
              type="text" 
              id="nic" 
              placeholder='Enter your 13 digit NIC number...'
              className="admin-register-input" 
              value={nic} 
              onChange={(e) => setNic(e.target.value)} 
              required
            />
          </div>
          <div className="admin-register-input-group">
            <label htmlFor="dob" className="admin-register-label">Date of Birth (DOB):</label>
            <input 
              type="date" 
              id="dob" 
              className="admin-register-input" 
              value={dob} 
              onChange={(e) => setDob(e.target.value)} 
              required
            />
          </div>
          <div className="admin-register-input-group">
            <label htmlFor="gender" className="admin-register-label">Gender:</label>
            <select 
              id="gender" 
              className="admin-register-input" 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="admin-register-input-group">
            <label htmlFor="password" className="admin-register-label">Password:</label>
            <input 
              type="password" 
              id="password" 
              placeholder='Enter your password...'
              className="admin-register-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="admin-register-button">REGISTER NOW</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPannelRegister;