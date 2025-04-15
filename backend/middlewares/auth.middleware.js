import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

dotenv.config();

// Middleware to check if the user is authenticated
export const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    // Check if token is missing
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required", success: false });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user by the decoded user ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }

    // Attach user information to the request
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};





