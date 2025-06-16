const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin registration
const registerAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, contactNo, nic, dob, gender, password, role } = req.body;

    if (!firstName || !lastName || !email || !contactNo || !nic || !dob || !gender || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    const admin = new Admin({
      firstName,
      lastName,
      email,
      contactNo,
      nic,
      dob,
      gender,
      password,
      role: role || 'Admin',
    });

    await admin.save();

    const token = admin.generateAuthToken();
    res.status(201).json({ message: 'Admin registered successfully', token });
  } catch (error) {
    next(error);
  }
};

// Admin login
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = admin.generateAuthToken();
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
