const { body, validationResult } = require('express-validator');

// Validator for admin registration
const validateAdminRegistration = [
  body('firstName').notEmpty().withMessage('First Name is required'),
  body('lastName').notEmpty().withMessage('Last Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('contactNo').matches(/^\d{11}$/).withMessage('Contact Number must be 11 digits'),
  body('nic').matches(/^\d{13}$/).withMessage('NIC must be 13 digits'),
  body('dob').isDate().withMessage('Please provide a valid Date of Birth'),
  body('gender').isIn(['Male', 'Female']).withMessage('Gender must be Male or Female'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role').optional().isIn(['Admin', 'SuperAdmin']).withMessage('Invalid role'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for admin login
const validateAdminLogin = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').exists().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateAdminRegistration, validateAdminLogin };
