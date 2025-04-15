import express from "express";
import { createEmail, deleteEmail, getALLEmailById, getEmailById } from "../controllers/email.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js"; // Assuming you have an authentication middleware to verify JWT

const router = express.Router();

// ✅ Route to create an email
router.post("/", verifyToken, createEmail);

// ✅ Route to get all emails for the authenticated user
router.get("/", verifyToken, getALLEmailById);

// ✅ Route to get a specific email by ID
router.get("/:id", verifyToken, getEmailById);

// ✅ Route to delete an email by ID
router.delete("/:id", verifyToken, deleteEmail);

export default router;








