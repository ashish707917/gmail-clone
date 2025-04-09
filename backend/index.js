import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

// ✅ Allowed frontend origins (no trailing slashes, no invalid characters)
const allowedOrigins = [
  "http://localhost:5173",
  "https://ashish707917.github.io"
];
console.log("✅ Allowed Origins:", allowedOrigins);

// ✅ Secure CORS setup
const corsOptions = {
  origin: function (origin, callback) {
    try {
      if (!origin) return callback(null, true); // Allow server-to-server or tools like curl/postman

      const sanitizedOrigin = origin.trim();
      if (allowedOrigins.includes(sanitizedOrigin)) {
        callback(null, true);
      } else {
        console.error("❌ CORS blocked origin:", sanitizedOrigin);
        callback(new Error("Not allowed by CORS"));
      }
    } catch (err) {
      console.error("❌ CORS error:", err);
      callback(err);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// ✅ Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight request support
app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully."))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
import userRoutes from "./routes/user.routes.js";
import emailRoutes from "./routes/email.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/email", emailRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("📬 Gmail Clone Backend is running!");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});






