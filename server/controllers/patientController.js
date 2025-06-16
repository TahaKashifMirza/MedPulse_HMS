const Patient = require('../models/patientModel');

// Get all patients
const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

// Get patient by ID
const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// Add a new patient
const createPatient = async (req, res, next) => {
  try {
    const { name, age, contact, address, medicalHistory } = req.body;

    // Validate required fields
    if (!name || !age || !contact || !address || !medicalHistory) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if contact already exists
    const existingPatient = await Patient.findOne({ contact });
    if (existingPatient) {
      return res.status(400).json({ message: 'Contact number already exists' });
    }

    const patient = new Patient({ name, age, contact, address, medicalHistory });
    await patient.save();
    res.status(201).json({ message: 'Patient added successfully', patient });
  } catch (error) {
    next(error);
  }
};

// Update patient details
const updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient updated successfully', updatedPatient });
  } catch (error) {
    next(error);
  }
};

// Delete a patient
const deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient };
