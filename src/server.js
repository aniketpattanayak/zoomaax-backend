const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db'); // Import the updated connectDB function
const articleRoutes = require('./routes/articleRoutes'); // Import routes

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Define allowed origins (e.g., for local development on different ports or production)
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5723', 'http://localhost:5724'];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  },
};

app.use(cors(corsOptions)); // Enable CORS with the specified options

// Connect to MongoDB
connectDB(); // Use the connectDB function to establish the database connection

// Mount article routes
app.use('/api/articles', articleRoutes); // All routes in articleRoutes.js are prefixed with /api/articles

// Global error handling (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
