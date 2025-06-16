// router/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Routes
router.post('/book', appointmentController.bookAppointment);
router.get('/appointments', appointmentController.getAllAppointments);
router.get('/appointments/:id', appointmentController.getAppointmentById);
router.patch('/appointments/:id/status', appointmentController.updateAppointmentStatus);
router.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports = router;
