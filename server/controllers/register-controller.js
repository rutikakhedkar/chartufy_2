const Register = require("../models/register_model")

const registerUser = async (req, res) => {
    try {
      const { username, email, password, intrests } = req.body;
  
      // Validate if interests is an array
      if (!Array.isArray(intrests)) {
        return res.status(400).json({ message: 'Interests must be an array' });
      }
  
      // Check if user already exists
      const existingUser = await Register.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create the new user
      const user = await Register.create({ username, email, password, intrests });
      res.status(201).json({ message: 'User created successfully', user });
    } 
    catch (error) {
      console.error(error); // Log error
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  module.exports={registerUser}