import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

// ✅ Register a new user
export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      success: true,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ✅ Login existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      success: true,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ✅ Logout user (just a client-side token removal trigger)
export const logoutUser = (req, res) => {
  try {
    // On JWT apps, logout is handled by client removing token
    res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};






