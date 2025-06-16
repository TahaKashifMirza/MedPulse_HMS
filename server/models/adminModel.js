const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Schema
const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  contactNo: {
    type: String,
    required: true,
    match: [/^\d{11}$/, 'Please provide a valid 11-digit contact number'],
  },
  nic: {
    type: String,
    required: true,
    match: [/^\d{13}$/, 'Please provide a valid 13-digit NIC'],
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Admin',
  },
}, { timestamps: true });

// Hash the password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare input password with stored (hashed) password
adminSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Generate JWT Token
adminSchema.methods.generateAuthToken = function () {
  const payload = {
    id: this._id,
    email: this.email,
    role: this.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

module.exports = mongoose.model('Admin', adminSchema);
