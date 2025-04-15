import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// env vars
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

// ✅ Fixed: Allowed Origins (trimmed, hardcoded)
const allowedOrigins = [
  'http://localhost:5173',   // Local frontend
  'https://ashish707917.github.io' // Production frontend (optional)
];

app.use(express.json());
app.use(cookieParser());

// ✅ CORS Setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("CORS error - blocked origin:", origin);
        callback(new Error("CORS not allowed for this origin: " + origin));
      }
    },
    credentials: true,  // Allow cookies and other credentials
  })
);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully."))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
import userRoutes from "./routes/user.routes.js";
import emailRoutes from "./routes/email.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Gmail Clone Backend is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});






