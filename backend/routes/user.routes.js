import express from 'express';
import { registerUser,logoutUser, loginUser, authenticate } from "../controllers/user.controllers.js";  // Correct import

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Logout route (If applicable, otherwise skip this)
router.post("/logout", authenticate, logoutUser);  // Assuming you have a logoutUser function

export default router;




