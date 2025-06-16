// validators/appointmentValidators.js
const Joi = require('joi');

const appointmentValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().length(11).required(),
  nic: Joi.string().length(13).required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  category: Joi.string().valid('Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic', 'Neurologist').required(),
  doctor: Joi.string().required(),
  appointmentDate: Joi.date().greater('now').required(),
  timeSlot: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports = appointmentValidator;
