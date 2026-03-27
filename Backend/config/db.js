const mongoose = require("mongoose");

const connectDB = async () => {
  // ADDED docker setup
    const uri = process.env.MONGO_URI || "mongodb://mongodb:27017/threadtothriftt";

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
