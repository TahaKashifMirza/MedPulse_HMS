const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  picture: {
    type: String, // Store Base64-encoded image
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  contactNo: {
    type: String,
    required: true,
    match: [/^\d{11}$/, "Contact number must be 11 digits"],
  },
  NIC: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{13}$/, "NIC must be 13 digits"],
  },
  DOB: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  specialization: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Cardiologist", "Dermatologist", "Pediatrician", "Orthopedic", "Neurologist"],
  },
  timings: [
    {
      day: String,
      start: String,
      end: String,
    },
  ],
});

module.exports = mongoose.model("Doctor", doctorSchema);
