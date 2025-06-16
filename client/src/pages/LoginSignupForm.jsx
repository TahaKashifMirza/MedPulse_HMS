import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useAuth } from "../store/auth"; // Import useAuth to access AuthContext
import "../CSS/LoginSignupForm.css"; // Import updated styles

const LoginSignupForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    cnic: "",
    dob: "",
    gender: "",
  });
  const [dobError, setDobError] = useState(""); // State for Date of Birth error
  const navigate = useNavigate(); // Create an instance of navigate
  const { storeTokenInLS } = useAuth(); // Access storeTokenInLS from AuthContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // If the input field is for 'dob', we can validate the date format here
    if (name === "dob") {
      validateDob(value); // Validate dob when the value changes
    }
  };

  const validateDob = (dob) => {
    // Regular expression to check if the date is in dd-mm-yyyy format
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (dob && !dobRegex.test(dob)) {
      setDobError("Date of Birth must be in dd-mm-yyyy format.");
    } else {
      setDobError(""); // Clear error if the format is correct
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dobError) {
      console.error("Form submission blocked due to invalid date.");
      return; // Don't proceed if date is invalid
    }

    if (isLogin) {
      // Call the login API
      try {
        const response = await axios.post("http://localhost:5001/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log(response.data);

        // If login is successful, store the token and navigate to the home page
        storeTokenInLS(response.data.token);
        navigate("/"); // Navigate to home page
      } catch (error) {
        console.error("Login failed", error);
      }
    } else {
      // Prepare the data to match the format you're requesting
      const signupData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(), // Ensure phone is a string
        cnic: formData.cnic.trim(),   // Ensure CNIC is a string
        dob: formData.dob.trim(),     // Ensure DOB is in dd-mm-yyyy format
        gender: formData.gender.trim(),
        password: formData.password.trim(),
      };

      // Call the signup API with the formatted data
      try {
        const response = await axios.post("http://localhost:5001/api/auth/register", signupData);
        console.log(response.data);

        // If signup is successful, store the token and navigate to the home page
        storeTokenInLS(response.data.token);
        navigate("/"); // Navigate to home page
      } catch (error) {
        console.error("Signup failed", error);
      }
    }
  };

  return (
    <div className={`form-container ${isLogin ? "login-main" : "signup-main"}`}>
      <div className="form-left">
        <h1>{isLogin ? "Welcome Back to MedPulse!" : "Create Your Account Now!"}</h1>
        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        <button className="switch-button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "SIGN UP" : "LOGIN"}
        </button>
      </div>

      <div className="form-right">
        {isLogin ? (
          <>
            <h1>Login to Your Account</h1>
            <form onSubmit={handleSubmit}>
              <input
                className="input-field"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <input
                className="input-field"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              <button className="submit-button" type="submit">LOGIN</button>
            </form>
          </>
        ) : (
          <>
            <h1>Create Your Account</h1>
            <form onSubmit={handleSubmit}>
              <input
                className="input-field"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
              />
              <input
                className="input-field"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
              />
              <input
                className="input-field"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <input
                className="input-field"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone (numeric)"
                required
              />
              <input
                className="input-field"
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleInputChange}
                placeholder="CNIC (numeric)"
                required
              />
              <input
                className="input-field"
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                placeholder="Date of Birth (dd-mm-yyyy)"
                required
              />
              {dobError && <p className="error-text">{dobError}</p>} {/* Display error message */}
              <select
                className="input-field"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                className="input-field"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              <button className="submit-button" type="submit" disabled={dobError}>SIGN UP</button> {/* Disable button if date is incorrect */}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignupForm;
