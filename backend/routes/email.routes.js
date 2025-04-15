import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createEmail,
  deleteEmail,
  getALLEmailById,
  getEmailById
} from "../controllers/email.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createEmail);
router.get("/", isAuthenticated, getALLEmailById);
router.get("/:id", isAuthenticated, getEmailById);
router.delete("/:id", isAuthenticated, deleteEmail);

export default router;








