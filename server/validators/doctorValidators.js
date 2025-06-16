const { check, validationResult } = require("express-validator");

const validateDoctor = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("contactNo").isLength({ min: 11, max: 11 }).withMessage("Contact No must be 11 digits"),
  check("NIC").isLength({ min: 13, max: 13 }).withMessage("NIC must be 13 digits"),
  check("DOB").isISO8601().toDate().withMessage("Valid Date of Birth is required"),
  check("gender").isIn(["Male", "Female"]).withMessage("Gender must be Male or Female"),
  check("specialization").notEmpty().withMessage("Specialization is required"),
  check("category")
    .isIn(["Cardiologist", "Dermatologist", "Pediatrician", "Orthopedic", "Neurologist"])
    .withMessage("Category must be a valid doctor category"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

module.exports = { validateDoctor };
