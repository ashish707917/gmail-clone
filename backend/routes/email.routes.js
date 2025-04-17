import express from "express";
import {
  createEmail,
  deleteEmail,
  getALLEmailById,
  getEmailById
} from "../controllers/email.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js"; // This now works

const router = express.Router();

router.post("/", authenticate, createEmail);
router.get("/", authenticate, getALLEmailById);
router.get("/:id", authenticate, getEmailById);
router.delete("/:id", authenticate, deleteEmail);

export default router;











