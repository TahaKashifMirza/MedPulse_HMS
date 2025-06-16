const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    match: /^[+]?[0-9]{1,4}[-\s]?[0-9]{10}$/, // Updated regex for phone numbers
    unique: true, // Ensure contact is unique
  },
  address: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: [String], // Array of strings for multiple entries
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
