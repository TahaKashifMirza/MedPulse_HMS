// controllers/appointmentController.js
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel'); // Adjust the path if necessary


// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, nic, dob, gender, category, doctor, appointmentDate, timeSlot, address } = req.body;

    // Fetch doctor by ID to get the doctor's name
    const selectedDoctor = await Doctor.findById(doctor);
    if (!selectedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const newAppointment = new Appointment({
      firstName,
      lastName,
      email,
      mobileNumber,
      nic,
      dob,
      gender,
      category,
      doctor: selectedDoctor.name, // Save the doctor's name, not the ID
      appointmentDate,
      timeSlot,
      address
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Approved', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment status updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// controllers/appointmentController.js
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};