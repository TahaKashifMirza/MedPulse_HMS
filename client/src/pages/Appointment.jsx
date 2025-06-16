import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import '../CSS/Appointment.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Appointment = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    nic: '',
    dob: '',
    gender: '',
    category: 'Select Category',
    doctor: '',
    appointmentDate: '',
    timeSlot: '',
    address: '',
  });

  const [doctorsList, setDoctorsList] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingTimings, setLoadingTimings] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

  // Set today's date and fetch user appointments
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setAppointmentDetails(prev => ({
      ...prev,
      appointmentDate: formattedDate,
      email: user?.email || '',
    }));

    // Fetch user appointments if logged in
    if (isLoggedIn && user?.email) {
      fetchUserAppointments();
    }
  }, [isLoggedIn, user]);

  const fetchUserAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/appointments?email=${user.email}`);
      setUserAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Fetch doctors when category changes
  useEffect(() => {
    const fetchDoctorsByCategory = async () => {
      if (appointmentDetails.category && appointmentDetails.category !== 'Select Category') {
        setLoadingDoctors(true);
        try {
          const response = await axios.get(
            `http://localhost:5001/api/doctors?category=${appointmentDetails.category}`
          );
          setDoctorsList(response.data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
          setDoctorsList([]);
        }
        setLoadingDoctors(false);
      }
    };

    fetchDoctorsByCategory();
  }, [appointmentDetails.category]);

  // Fetch doctor timings when doctor is selected
  useEffect(() => {
    const fetchDoctorTimings = async () => {
      if (appointmentDetails.doctor) {
        setLoadingTimings(true);
        try {
          const response = await axios.get(
            `http://localhost:5001/api/doctors/${appointmentDetails.doctor}`
          );
          const slots = response.data.timings;
          setTimeSlots(slots);
          setAppointmentDetails(prev => ({
            ...prev,
            timeSlot: '',
          }));
        } catch (error) {
          console.error('Error fetching doctor timings:', error);
          setTimeSlots([]);
        }
        setLoadingTimings(false);
      }
    };

    fetchDoctorTimings();
  }, [appointmentDetails.doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setErrorMessage('Please login to book an appointment');
      toast.error('Please login to book an appointment'); // Toast error for login failure
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/api/book',
        appointmentDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('Appointment booked successfully!'); // Show success message
        fetchUserAppointments();
        setAppointmentDetails(prev => ({
          ...prev,
          category: 'Select Category',
          doctor: '',
          appointmentDate: new Date().toISOString().split('T')[0],
          timeSlot: '',
          address: '',
        }));
      }
    } catch (error) {
      setErrorMessage('Failed to book appointment. Please try again.');
      toast.error('Failed to book appointment. Please try again.'); // Show error message
      console.error(error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-required">
        <div className="contact-main-contactpage">
          <div className="contact-main-logo-container">
            <img src="/Images/Logo2.png" alt="Logo" className="contact-main-logo" />
          </div>
          <h1 className="login-required-h1">You Need To Login To Book An Appointment</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="appointmentmain-main">
      <h1 className="appointmentmain-main-heading">Book Your Appointment on MedPulse</h1>

      {userAppointments.length > 0 && (
        <div className="appointmentmain-user-appointments">
          <h2>Your Appointments</h2>
          <div className="appointmentmain-appointments-list">
            {userAppointments.map((appointment) => (
              <div key={appointment._id} className="appointmentmain-appointment-card">
                <p><strong>Doctor:</strong> {appointment.doctor}</p>
                <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.timeSlot}</p>
                <p><strong>Status:</strong> <span className={`status-${appointment.status.toLowerCase()}`}>{appointment.status}</span></p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="appointmentmain-description">
        <p>Welcome to MedPulse, a trusted healthcare provider offering high-quality medical care.</p>
        <p>Book an appointment with one of our skilled doctors to take the first step toward better health!</p>
      </div>

      <p className="appointmentmain-form-heading">Fill in the form, and we'll get in touch with you soon!</p>

      {errorMessage && <p className="appointmentmain-error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="appointmentmain-appointment-form">
        <div className="appointmentmain-form-row">
          <div className="appointmentmain-form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name..."
              value={appointmentDetails.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="appointmentmain-form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name..."
              value={appointmentDetails.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="appointmentmain-form-row">
          <div className="appointmentmain-form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your valid email..."
              value={appointmentDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="appointmentmain-form-group">
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Enter your mobile number..."
              value={appointmentDetails.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="appointmentmain-form-row">
          <div className="appointmentmain-form-group">
            <label>NIC:</label>
            <input
              type="text"
              name="nic"
              placeholder="Enter your 13 digit NIC number..."
              value={appointmentDetails.nic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="appointmentmain-form-group">
            <label>Date of Birth (DOB):</label>
            <input
              type="date"
              name="dob"
              value={appointmentDetails.dob}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="appointmentmain-form-row">
          <div className="appointmentmain-form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={appointmentDetails.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="appointmentmain-form-group">
            <label>Category:</label>
            <select
              name="category"
              value={appointmentDetails.category}
              onChange={handleChange}
              required
            >
              <option value="Select Category">Select Category</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Neurologist">Neurologist</option>
            </select>
          </div>
        </div>

        <div className="appointmentmain-form-row">
          <div className="appointmentmain-form-group">
            <label>Doctor:</label>
            <select
              name="doctor"
              value={appointmentDetails.doctor}
              onChange={handleChange}
              disabled={loadingDoctors || !appointmentDetails.category}
              required
            >
              <option value="">Select Doctor</option>
              {doctorsList.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} ({doctor.specialization})
                </option>
              ))}
              {doctorsList.length === 0 && !loadingDoctors && (
                <option disabled>No doctors available in this category</option>
              )}
            </select>
            {loadingDoctors && <span className="appointmentmain-loading">Loading doctors...</span>}
          </div>
          <div className="appointmentmain-form-group">
            <label>Appointment Date:</label>
            <input
              type="date"
              name="appointmentDate"
              value={appointmentDetails.appointmentDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="appointmentmain-form-row">
          <div className="appointmentmain-form-group">
            <label>Time Slot:</label>
            <select
              name="timeSlot"
              value={appointmentDetails.timeSlot}
              onChange={handleChange}
              required
            >
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={`${slot.day}: ${slot.start} - ${slot.end}`}>
                  {slot.day}: {slot.start} - {slot.end}
                </option>
              ))}
              {timeSlots.length === 0 && !loadingTimings && (
                <option disabled>No available time slots</option>
              )}
            </select>
            {loadingTimings && <span className="appointmentmain-loading">Loading timings...</span>}
          </div>
          <div className="appointmentmain-form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address..."
              value={appointmentDetails.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="appointmentmain-submit-btn">
          Book Appointment
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Appointment;
