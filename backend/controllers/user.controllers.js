import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// ===============================
// ✅ Register a New User
// ===============================
export const register = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    // Trim and normalize inputs
    fullname = fullname.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const profilePhoto = "https://avatar.iran.liara.run/public/boy"; // Default avatar

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      profilephoto: profilePhoto
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ===============================
// ✅ Login User
// ===============================
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect email or password", success: false });
    }

    // ✅ Add email to token payload
    const tokenData = { userId: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

    // ✅ Set token as a secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set true in production with HTTPS
      sameSite: "Lax", // Lax works well for local dev
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.status(200).json({
      message: `${user.fullname} logged in successfully.`,
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilephoto: user.profilephoto,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ===============================
// ✅ Logout User
// ===============================
export const logout = async (req, res) => {
  try {
    return res.status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
      })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
