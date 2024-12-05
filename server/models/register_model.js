const mongoose = require('mongoose');

// Define the schema for the user
const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  password: {
    type: String,
    required: true
  },
  intrests: {
    type: [String], // Array of strings
    required: true
  }
});

// Create the Mongoose model
const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
