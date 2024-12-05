const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require("cors");
const registerRouter = require("./routers/register-router"); // Ensure this is correctly imported

app.use(express.json()); // Parse incoming JSON requests

// CORS setup
app.use(cors({
  origin: ['https://chartufy-2.vercel.app', 'http://localhost:3000'], // Allow both production and local dev environments
  methods: ['GET', 'POST'],
  credentials: true // Allow credentials like cookies
}));

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

// Log the DB URL to ensure it's being loaded properly
// console.log('MongoDB URL:', dbUrl);

// MongoDB setup
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Root route for testing
app.get('/', (req, res) => {
  return res.status(200).json("Welcome route");
});

// Register route setup
app.use('/api/auth', registerRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


