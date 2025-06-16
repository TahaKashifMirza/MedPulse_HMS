const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const { validateAdminRegistration, validateAdminLogin } = require('../validators/adminValidators');
const router = express.Router();

router.post('/register', validateAdminRegistration, registerAdmin); // Admin registration with validation
router.post('/login', validateAdminLogin, loginAdmin); // Admin login with validation

module.exports = router;
