const express = require("express");
const { addDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor } = require("../controllers/doctorController");
const { validateDoctor } = require("../validators/doctorValidators");

const router = express.Router();

// Add a new doctor
router.post("/add", validateDoctor, addDoctor);

// Get all doctors
router.get("/", getDoctors);

// Get a single doctor by ID
router.get("/:id", getDoctorById);

// Update doctor details
router.put("/:id", validateDoctor, updateDoctor);

// Delete a doctor
router.delete("/:id", deleteDoctor);

module.exports = router;
