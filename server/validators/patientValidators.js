const { body } = require('express-validator');

const patientValidators = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Patient name is required')
    .isLength({ min: 3 })
    .withMessage('Patient name must be at least 3 characters long'),

  body('age')
    .isInt({ min: 0 })
    .withMessage('Age must be a positive number'),

  body('gender')
    .trim()
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be one of: Male, Female, Other'),

  body('contact')
    .trim()
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Invalid contact number'),
];

module.exports = patientValidators;
