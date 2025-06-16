import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/AdminAppointment.css';

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  // Update appointment status (approve/cancel)
  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await axios.patch(`http://localhost:5001/api/appointments/${id}/status`, { status });
      if (response.status === 200) {
        fetchAppointments(); // Refresh the list after updating the status
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Delete appointment
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/appointments/${id}`);
      if (response.status === 200) {
        fetchAppointments(); // Refresh the list after deleting
      }
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="adminappointment">
      <h1>MedPulse - Manage Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th> {/* Added Mobile Number column */}
            <th>NIC</th> {/* Added NIC column */}
            <th>DOB</th> {/* Added DOB column */}
            <th>Gender</th> {/* Added Gender column */}
            <th>Address</th> {/* Added Address column */}
            <th>Doctor</th>
            <th>Appointment Date</th>
            <th>Time Slot</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.firstName} {appointment.lastName}</td>
              <td>{appointment.email}</td>
              <td>{appointment.mobileNumber}</td> {/* Displaying Mobile Number */}
              <td>{appointment.nic}</td> {/* Displaying NIC */}
              <td>{new Date(appointment.dob).toLocaleDateString()}</td> {/* Displaying DOB */}
              <td>{appointment.gender}</td> {/* Displaying Gender */}
              <td>{appointment.address}</td> {/* Displaying Address */}
              <td>{appointment.doctor}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td>{appointment.timeSlot}</td>
              <td className={`status ${appointment.status}`}>{appointment.status}</td>
              <td>
                {appointment.status === 'Pending' && (
                  <>
                    <button className="approve" onClick={() => handleUpdateStatus(appointment._id, 'Approved')}>Approve</button>
                    <button className="cancel" onClick={() => handleUpdateStatus(appointment._id, 'Cancelled')}>Cancel</button>
                  </>
                )}
                <button className="delete" onClick={() => handleDelete(appointment._id)}>Delete</button> {/* Delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointment;
