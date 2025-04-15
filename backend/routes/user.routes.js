import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { register, login } from '../controllers/user.controllers.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protect the "me" route
router.get("/me", isAuthenticated, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

export default router;






