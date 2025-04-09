import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ✅ Register
export const register = async (req, res) => {
  try {
    // Safe destructuring to avoid 'undefined.trim()' error
    let { fullname = "", email = "", password = "" } = req.body;

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
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      profilephoto: "https://avatar.iran.liara.run/public/boy"
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

// ✅ Login
export const login = async (req, res) => {
  try {
    let { email = "", password = "" } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password", success: false });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: `${user.fullname} logged in successfully.`,
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilephoto: user.profilephoto
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ✅ Logout
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }).json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
