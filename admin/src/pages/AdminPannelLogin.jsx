import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import { toast, ToastContainer } from 'react-toastify';  // Correctly import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import the default Toastify CSS
import '../CSS/AdminPannelLogin.css';

const AdminPannelLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setError('');

    const loginData = {
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:5001/api/admins/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        const adminToken = data.token; // Assuming the response contains the admin token

        // Store the token in localStorage
        localStorage.setItem('token', adminToken);

        // Optionally, set other admin-related data if you need (e.g., name, email)
        // localStorage.setItem('adminName', data.adminData.name);

        console.log('Login successful');
        
        // Show success toast
        toast.success('Login Successful!', {
          position: "top-right",  // Corrected positioning for Toastify
          autoClose: 5000,        // Auto close the toast after 5 seconds
          hideProgressBar: true,  // Hide the progress bar (optional)
          closeOnClick: true,     // Allow closing toast on click
        });

        // Navigate to the admin home page after successful login
        navigate('/admin-home');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid login credentials');

        // Show error toast
        toast.error('Login Failed. Please check your credentials.', {
          position: "top-right",  // Corrected positioning for Toastify
          autoClose: 5000,        // Auto close the toast after 5 seconds
          hideProgressBar: true,  // Hide the progress bar (optional)
          closeOnClick: true,     // Allow closing toast on click
        });
      }
    } catch (error) {
      setError('An error occurred, please try again later.');
      
      // Show error toast
      toast.error('An error occurred. Please try again later.', {
        position: "top-right",  // Corrected positioning for Toastify
        autoClose: 5000,        // Auto close the toast after 5 seconds
        hideProgressBar: true,  // Hide the progress bar (optional)
        closeOnClick: true,     // Allow closing toast on click
      });
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <img src="/Images/Logo2.png" alt="Logo" className="admin-login-logo" />
        <h1 className="admin-login-heading">WELCOME TO MedPulse ADMIN PANNEL</h1>
        <p className="admin-login-paragraph">Only Admin Are Allowed To Access These Resources!</p>
        {error && <p className="admin-login-error">{error}</p>}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-input-group">
            <label htmlFor="email" className="admin-login-label">Email</label>
            <input 
              type="email" 
              id="email" 
              className="admin-login-input" 
              value={email} 
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="admin-login-input-group">
            <label htmlFor="password" className="admin-login-label">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Password"
              className="admin-login-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="admin-login-button">LOGIN</button>
        </form>
      </div>

      {/* Toast container for showing the toasts */}
      <ToastContainer />
    </div>
  );
};

export default AdminPannelLogin;
