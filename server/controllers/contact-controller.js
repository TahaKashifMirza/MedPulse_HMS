const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  console.log(req.body); // Log the incoming data
  const { firstName, lastName, email, mobileNumber, message } = req.body;

  try {
    const contact = new Contact({
      firstName,
      lastName,
      email,
      mobileNumber,
      message,
    });

    await contact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error saving contact form data:", error);
    res.status(500).json({ message: "Error submitting contact form" });
  }
};


// Function to fetch all messages from the database
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); // Sorted by newest messages first
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ message: "Error retrieving messages" });
  }
};

module.exports = { contactForm, getAllMessages };
