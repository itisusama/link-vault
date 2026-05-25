const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const linkRoutes = require('./routes/links');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Cache connection across warm serverless invocations
let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) return;

  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/linksaver';

  await mongoose.connect(mongoURI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = true;
};

// Ensure DB is connected before any route runs
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

app.use('/api/links', linkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
