const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel"); // Admin model

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided." });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const adminData = await Admin.findOne({ email: isVerified.email }).select({ password: 0 });
    if (adminData) {
      req.admin = adminData; // Attach admin data to the request
      req.token = token;
      req.userID = adminData._id;
      req.isAdmin = true; // Add a flag for admin
      return next();
    }

    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
