import express from "express";
import {
  createEmail,
  deleteEmail,
  getALLEmailById,
  getEmailById
} from "../controllers/email.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new email
router.post("/", isAuthenticated, createEmail);

// Delete an email by ID
router.delete("/:id", isAuthenticated, deleteEmail);

// Get all emails sent by the logged-in user
router.get("/", isAuthenticated, getALLEmailById);

// Get a specific email by ID
router.get("/:id", isAuthenticated, getEmailById);

export default router;





