import express from "express";
import { login, register, logout } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;




