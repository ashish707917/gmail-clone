import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";  // Adjust if needed
import emailRoutes from "./routes/email.routes.js"; // Adjust if needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend-domain.com"], // Allow your frontend
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/email", emailRoutes);  // If you're using separate email routes

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI)  // No need to specify deprecated options
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
  });