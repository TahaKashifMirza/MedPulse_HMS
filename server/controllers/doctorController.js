const Doctor = require("../models/doctorModel");

// Add Doctor
const addDoctor = async (req, res) => {
  try {
    const { picture, name, email, contactNo, NIC, DOB, gender, specialization, category, timings } = req.body;

    // Create new doctor
    const newDoctor = new Doctor({
      picture, // Store image as Base64 string
      name,
      email,
      contactNo,
      NIC,
      DOB,
      gender,
      specialization,
      category,
      timings: JSON.parse(timings), // Ensure timings is an array
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get All Doctors
// In getDoctors controller function
const getDoctors = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const doctors = await Doctor.find(filter);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get Doctor By ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update Doctor
const updateDoctor = async (req, res) => {
  try {
    const { picture, name, email, contactNo, NIC, DOB, gender, specialization, category, timings } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        picture,
        name,
        email,
        contactNo,
        NIC,
        DOB,
        gender,
        specialization,
        category,
        timings: JSON.parse(timings),
      },
      { new: true } // Return the updated document
    );

    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete Doctor
const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Export Controller Functions
module.exports = { addDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor };
