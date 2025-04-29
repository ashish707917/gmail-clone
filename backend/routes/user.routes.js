import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controllers.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Logout route
router.post("/logout", logoutUser);

// Example of a protected route
// router.get("/profile", authenticate, getProfile);

export default router;





