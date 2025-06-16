const mongoose = require('mongoose');

const URI = process.env.URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connection Established!!");
    
  } catch (error) {
    console.log("Database Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDb;
