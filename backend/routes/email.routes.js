import express from 'express';
import { createEmail, deleteEmail, getALLEmailById, getEmailById } from '../controllers/email.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';

const router = express.Router();

// ✅ Create an email
router.post("/", isAuthenticated, createEmail);

// ✅ Get all emails for the logged-in user
router.get("/", isAuthenticated, getALLEmailById);

// ✅ Get a single email by ID
router.get("/:id", isAuthenticated, getEmailById);

// ✅ Delete an email by ID
router.delete("/:id", isAuthenticated, deleteEmail);

export default router;






