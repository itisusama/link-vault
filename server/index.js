const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const linkRoutes = require('./routes/links');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Use global cache so the connection survives across serverless warm restarts
const connectDB = async () => {
  if (global._mongooseConnected && mongoose.connection.readyState === 1) return;

  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  await mongoose.connect(mongoURI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000,
  });

  global._mongooseConnected = true;
};

// Ensure DB is connected before any route runs
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

app.use('/api/links', linkRoutes);

// Only listen when running locally, not on Vercel serverless
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
