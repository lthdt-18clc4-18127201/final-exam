import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Failed to connect to MongoDB");
    throw error;
  }
};

export default connection;
