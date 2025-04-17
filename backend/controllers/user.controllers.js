import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Register
export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ fullname, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilephoto: user.profilephoto || "",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilephoto: user.profilephoto || "",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to protect routes
export const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Access denied. No token provided." });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

// Logout
export const logoutUser = (req, res) => {
  try {
    // Since we're using token-based auth, logout is just a client-side token removal
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





