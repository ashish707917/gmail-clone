import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userRoutes from "./routes/user.routes.js";  // <-- Add this import for user routes
import emailRoutes from "./routes/email.routes.js"; // <-- Add this import for email routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Read CLIENT_URLS from .env and split it into an array
const allowedOrigins = process.env.CLIENT_URLS.split(',');

// Middlewares
app.use(cors({
  origin: allowedOrigins,  // Use the allowed origins from .env
  credentials: true,       // Allow sending cookies
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes);  // User routes
app.use("/api/v1/email", emailRoutes);  // Email routes

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

// User model with password hashing and verification
const userSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  password: String,
  profilephoto: String,
});

// Hash password before saving user
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Verify password during login
userSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
