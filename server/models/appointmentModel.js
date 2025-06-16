// models/appointmentModel.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, minlength: 11, maxlength: 11 },
  nic: { type: String, required: true, minlength: 13, maxlength: 13 },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  category: { type: String, enum: ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic', 'Neurologist'], required: true },
  doctor: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Cancelled'] },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
