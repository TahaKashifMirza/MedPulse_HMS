import { useState } from 'react';
import '../CSS/AdminRegisterDoctor.css';

const AdminRegisterDoctor = () => {
  const [formData, setFormData] = useState({
    picture: '',
    name: '',
    email: '',
    contactNo: '',
    NIC: '',
    DOB: '',
    gender: '',
    specialization: '',
    category: '',
    timings: [
      { day: 'Monday', start: '09:00', end: '17:00' },
    ],
  });

  // Handle file upload and convert to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          picture: reader.result.split(',')[1],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle timings change
  const handleTimingsChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prev) => {
      const newTimings = [...prev.timings];
      newTimings[index] = { ...newTimings[index], [field]: value };
      return { ...prev, timings: newTimings };
    });
  };

  // Add new timing entry
  const handleAddTiming = () => {
    setFormData((prev) => ({
      ...prev,
      timings: [...prev.timings, { day: '', start: '09:00', end: '17:00' }],
    }));
  };

  // Remove timing entry
  const handleRemoveTiming = (index) => {
    setFormData((prev) => {
      const newTimings = prev.timings.filter((_, i) => i !== index);
      return { ...prev, timings: newTimings };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert DOB to ISO format and prepare the data for submission
      const payload = {
        ...formData,
        DOB: new Date(formData.DOB).toISOString(),
        timings: JSON.stringify(formData.timings), // Ensure timings are JSON formatted
      };

      // Send the data to the backend API
      const response = await fetch('http://localhost:5001/api/doctors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register doctor');
      }

      // Reset form on success
      setFormData({
        picture: '',
        name: '',
        email: '',
        contactNo: '',
        NIC: '',
        DOB: '',
        gender: 'Male',
        specialization: '',
        category: 'Cardiologist',
        timings: [{ day: '', start: '09:00', end: '17:00' }],
      });

      alert('Doctor registered successfully!');
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Error registering doctor. Please check the details and try again.');
    }
  };

  return (
    <div className="admindrregister-container">
      <div className="admindrregister-layout">
        {/* Left Side - Image Upload */}
        <div className="admindrregister-left">
          <div className="admindrregister-image-container">
            <div className="admindrregister-image-preview">
              {formData.picture ? (
                <img
                  src={`data:image/jpeg;base64,${formData.picture}`}
                  alt="Selected"
                  className="admindrregister-preview-image"
                />
              ) : (
                <div className="admindrregister-default-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="file"
              id="imageUpload"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
            <label htmlFor="imageUpload" className="admindrregister-upload-btn">
              Select Image
            </label>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="admindrregister-right">
          <h1 className="admindrregister-title">Add MedPulse New Doctor:</h1>

          <form onSubmit={handleSubmit} className="admindrregister-form">
            <div className="admindrregister-form-grid">
              <div className="admindrregister-form-group">
                <label className="admindrregister-label">Full Name:</label>
                <input
                  type="text"
                  placeholder="Enter your full name..."
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="admindrregister-input"
                  required
                />
              </div>

              <div className="admindrregister-form-group">
                <label className="admindrregister-label">Email Address:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your valid email address..."
                  value={formData.email}
                  onChange={handleChange}
                  className="admindrregister-input"
                  required
                />
              </div>

              <div className="admindrregister-form-group">
                <label className="admindrregister-label">Contact Number:</label>
                <input
                  type="tel"
                  name="contactNo"
                  placeholder="Enter your 11 digit phone number..."
                  value={formData.contactNo}
                  onChange={handleChange}
                  pattern="[0-9]{11}"
                  className="admindrregister-input"
                  required
                />
              </div>

              <div className="admindrregister-form-group">
                <label className="admindrregister-label">NIC Number:</label>
                <input
                  type="text"
                  name="NIC"
                  placeholder="Enter your 13 digit NIC number..."
                  value={formData.NIC}
                  onChange={handleChange}
                  pattern="[0-9]{13}"
                  className="admindrregister-input"
                  required
                />
              </div>

              <div className="admindrregister-form-group">
                <label className="admindrregister-label">Date of Birth (DOB):</label>
                <input
                  type="date"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleChange}
                  className="admindrregister-input"
                  required
                />
              </div>

              <div className="admindrregister-form-group">
                <label className="admindrregister-label">Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="admindrregister-select"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="admindrregister-form-group">
                <label className="admindrregister-label">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  placeholder="Enter doctor specialization..."
                  value={formData.specialization}
                  onChange={handleChange}
                  className="admindrregister-input"
                  required
                />
              </div>

              <div className="admindrregister-form-group">
                <label className="admindrregister-label">Category:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="admindrregister-select"
                >
                  <option value="">Select Category</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Neurologist">Neurologist</option>
                </select>
              </div>
            </div>

            {/* Timings Section */}
            <div className="admindrregister-timings">
              <h3 className="admindrregister-subtitle">Working Hours:</h3>
              {formData.timings.map((timing, index) => (
                <div key={index} className="admindrregister-timing-group">
                  <label className="admindrregister-day-label">Day</label>
                  <select
                    value={timing.day}
                    onChange={(e) => handleTimingsChange(e, index, 'day')}
                    className="admindrregister-select"
                  >
                    
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>

                  <label className="admindrregister-day-label">Time:</label>
                  <div className="admindrregister-time-inputs">
                    <input
                      type="time"
                      value={timing.start}
                      onChange={(e) => handleTimingsChange(e, index, 'start')}
                      className="admindrregister-time-input"
                    />
                    <span className="admindrregister-time-separator">to</span>
                    <input
                      type="time"
                      value={timing.end}
                      onChange={(e) => handleTimingsChange(e, index, 'end')}
                      className="admindrregister-time-input"
                    />
                  </div>

                  <button
                    type="button"
                    className="admindrregister-remove-btn"
                    onClick={() => handleRemoveTiming(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddTiming} className="admindrregister-add-btn">
                Add Timing
              </button>
            </div>

            <button type="submit" className="admindrregister-submit-btn">
              Register Doctor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterDoctor;
