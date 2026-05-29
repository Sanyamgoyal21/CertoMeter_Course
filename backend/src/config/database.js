const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-career-accelerator';

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      dbName: 'ai_career_accelerator',
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed — running without database:', error.message);
    // Continue without DB for demo purposes
  }
}

module.exports = { connectDB };
