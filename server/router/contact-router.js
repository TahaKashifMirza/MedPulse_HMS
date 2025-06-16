const express = require("express");
const router = express.Router();
const { contactForm, getAllMessages } = require("../controllers/contact-controller");

// Route to submit the contact form
router.route("/contact").post(contactForm);

// Route to fetch all contact messages
router.route("/contact/messages").get(getAllMessages);

module.exports = router;