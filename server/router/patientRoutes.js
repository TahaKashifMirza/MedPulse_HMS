const express = require('express');
const {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
} = require('../controllers/patientController');
const authMiddleware = require('../middlewares/auth-middleware'); // Auth Middleware
const router = express.Router();

// Routes
router.get('/', authMiddleware, getAllPatients); // Get all patients with auth
router.get('/:id', authMiddleware, getPatientById); // Get patient by ID with auth
router.post('/', authMiddleware, createPatient); // Add new patient with validation and auth
router.put('/:id', authMiddleware, updatePatient); // Update patient by ID with validation and auth
router.delete('/:id', authMiddleware, deletePatient); // Delete patient by ID with auth

module.exports = router;
