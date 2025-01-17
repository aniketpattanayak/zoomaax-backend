const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db'); // Import the updated connectDB function
const articleRoutes = require('./routes/articleRoutes'); // Import routes

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Define allowed origins for CORS
// You can add your local development URLs, Vercel frontend URLs, etc.
const allowedOrigins = [
  'http://localhost:5173',  // Frontend 1 (Local development)
  'http://localhost:5174',  // Frontend 2 (Local development)
  'https://frontend1.vercel.app', // Vercel Frontend 1 URL
  'https://frontend2.vercel.app', // Vercel Frontend 2 URL
  'http://your-frontend-domain.com' // Replace with actual domain if needed
];

// CORS configuration to allow specific origins
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

// Connect to MongoDB using the connectDB function
connectDB();

// Mount article routes
app.use('/api/articles', articleRoutes); // All routes in articleRoutes.js are prefixed with /api/articles

// Global error handling (Optional, but useful for production)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000; // Default port is 3000, or use environment variable

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
