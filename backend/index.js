import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import emailRoutes from "./routes/email.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

const allowedOrigins = process.env.CLIENT_URLS.split(',');

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/email", emailRoutes);

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

