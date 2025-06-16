// DoctorList.jsx
import { useEffect, useState } from 'react';
import '../CSS/AdminDoctorList.css';
import { FaEdit, FaTrash, FaClock, FaPlus, FaTimes } from 'react-icons/fa';

const AdminDoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [editData, setEditData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/doctors');
        const data = await response.json();
        setDoctors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        const response = await fetch(`http://localhost:5001/api/doctors/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setDoctors(doctors.filter(doctor => doctor._id !== id));
        }
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    setEditData({
      ...doctor,
      DOB: new Date(doctor.DOB).toISOString().split('T')[0],
      timings: [...doctor.timings]
    });
    setIsModalOpen(true);
    setErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleTimingChange = (index, field, value) => {
    setEditData(prev => {
      const newTimings = [...prev.timings];
      newTimings[index][field] = value;
      return { ...prev, timings: newTimings };
    });
  };

  const addTimingSlot = () => {
    setEditData(prev => ({
      ...prev,
      timings: [...prev.timings, { day: 'Monday', start: '09:00', end: '17:00' }]
    }));
  };

  const removeTimingSlot = (index) => {
    setEditData(prev => ({
      ...prev,
      timings: prev.timings.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData(prev => ({
          ...prev,
          picture: reader.result.split(',')[1]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{13}$/.test(editData.NIC)) newErrors.NIC = "NIC must be 13 digits";
    if (!/^\d{11}$/.test(editData.contactNo)) newErrors.contactNo = "Contact must be 11 digits";
    if (!editData.email.includes('@')) newErrors.email = "Invalid email address";
    if (!editData.name.trim()) newErrors.name = "Name is required";
    if (!editData.specialization.trim()) newErrors.specialization = "Specialization required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...editData,
        timings: JSON.stringify(editData.timings)
      };

      const response = await fetch(
        `http://localhost:5001/api/doctors/${selectedDoctor._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
      }

      const updatedDoctor = await response.json();
      setDoctors(doctors.map(doc => 
        doc._id === updatedDoctor._id ? updatedDoctor : doc
      ));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Update error:', error);
      setErrors({ submit: error.message });
    }
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="doctor-list-container">
      <h1 className="section-title">MedPulse Doctors Directory:</h1>
      
      <div className="doctor-grid">
        {doctors.map(doctor => (
          <div key={doctor._id} className="doctor-card">
            <div className="card-header">
              <img 
                src={`data:image/jpeg;base64,${doctor.picture}`} 
                alt={doctor.name} 
                className="doctor-avatar"
              />
              <h2 className="doctor-name">{doctor.name}</h2>
              <p className="doctor-specialization">{doctor.specialization}</p>
            </div>

            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Contact:</span>
                <span className="info-value">{doctor.contactNo}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{doctor.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">NIC:</span>
                <span className="info-value">{doctor.NIC}</span>
              </div>
              <div className="info-row">
                <span className="info-label">DOB:</span>
                <span className="info-value">
                  {new Date(doctor.DOB).toLocaleDateString()}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Gender:</span>
                <span className="info-value">{doctor.gender}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Category:</span>
                <span className="info-value">{doctor.category}</span>
              </div>
              
              <div className="timings-section">
                <h4 className="timings-title"><FaClock /> Working Hours</h4>
                {doctor.timings.map((timing, index) => (
                  <div key={index} className="timing-slot">
                    <span className="timing-day">{timing.day}</span>
                    <span className="timing-hours">
                      {timing.start} - {timing.end}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="edit-btn"
                onClick={() => openEditModal(doctor)}
              >
                <FaEdit /> Edit
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(doctor._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h2>Edit MedPulse Doctor Details:</h2>
              <button 
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="edit-form">
              <div className="form-columns">
                <div className="form-column">
                  <div className="form-group">
                    <label>Profile Picture</label>
                    <div className="image-upload">
                      <img 
                        src={`data:image/jpeg;base64,${editData.picture}`} 
                        alt="Current" 
                        className="current-image"
                      />
                      <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        id="imageUpload"
                      />
                      <label htmlFor="imageUpload" className="upload-label">
                        Change Image
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Full Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className={errors.name ? 'has-error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email Address:</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      className={errors.email ? 'has-error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>Contact Number:</label>
                    <input
                      type="tel"
                      name="contactNo"
                      value={editData.contactNo}
                      onChange={handleEditChange}
                      className={errors.contactNo ? 'has-error' : ''}
                    />
                    {errors.contactNo && <span className="error-message">{errors.contactNo}</span>}
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group">
                    <label>NIC:</label>
                    <input
                      type="text"
                      name="NIC"
                      value={editData.NIC}
                      onChange={handleEditChange}
                      className={errors.NIC ? 'has-error' : ''}
                    />
                    {errors.NIC && <span className="error-message">{errors.NIC}</span>}
                  </div>

                  <div className="form-group">
                    <label>Date of Birth (DOB):</label>
                    <input
                      type="date"
                      name="DOB"
                      value={editData.DOB}
                      onChange={handleEditChange}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Gender:</label>
                    <select
                      name="gender"
                      value={editData.gender}
                      onChange={handleEditChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Specialization:</label>
                    <input
                      type="text"
                      name="specialization"
                      value={editData.specialization}
                      onChange={handleEditChange}
                      className={errors.specialization ? 'has-error' : ''}
                    />
                    {errors.specialization && <span className="error-message">{errors.specialization}</span>}
                  </div>

                  <div className="form-group">
                    <label>Category:</label>
                    <select
                      name="category"
                      value={editData.category}
                      onChange={handleEditChange}
                    >
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Orthopedic">Orthopedic</option>
                      <option value="Neurologist">Neurologist</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="timings-form-section">
                <h3>Working Hours:</h3>
                {editData.timings?.map((timing, index) => (
                  <div key={index} className="timing-input-group">
                    <select
                      value={timing.day}
                      onChange={(e) => handleTimingChange(index, 'day', e.target.value)}
                    >
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                        .map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <input
                      type="time"
                      value={timing.start}
                      onChange={(e) => handleTimingChange(index, 'start', e.target.value)}
                    />
                    <input
                      type="time"
                      value={timing.end}
                      onChange={(e) => handleTimingChange(index, 'end', e.target.value)}
                    />
                    <button
                      type="button"
                      className="remove-timing-btn"
                      onClick={() => removeTimingSlot(index)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="add-timing-btn"
                  onClick={addTimingSlot}
                >
                  <FaPlus /> Add Time Slot
                </button>
              </div>

              {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDoctorList;