import express from "express";
import dotenv from "dotenv";
import Connect from "./DB/Connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import emailRoute from "./routes/email.route.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
Connect().catch(err => {
  console.error("Database connection failed:", err);
  process.exit(1); // Stop server if DB connection fails
});

const PORT = process.env.PORT || 5050;
const app = express();

// ✅ Secure CORS settings — needs to be set FIRST
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

// ✅ Then other middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

