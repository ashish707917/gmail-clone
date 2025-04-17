import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connect = async () => {
  try {
    // Remove useNewUrlParser and useUnifiedTopology options as they are no longer needed
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }
};

export default Connect;


