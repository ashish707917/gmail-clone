import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";  // User routes
import emailRoutes from "./routes/email.routes.js"; // Email routes (if applicable)

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors({
  origin: ["http://localhost:5173", "https://ashish707917.github.io"], // Frontend URLs
  credentials: true,  // Allow sending cookies
}));
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/email", emailRoutes);  // If using email routes, ensure they are set up properly

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)  // MongoDB URI from .env file
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
