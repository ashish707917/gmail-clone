import express from "express";
import { register, login, logout } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/register", register);  // Register user
router.post("/login", login);  // Login user
router.post("/logout", logout);  // Logout user

export default router;






