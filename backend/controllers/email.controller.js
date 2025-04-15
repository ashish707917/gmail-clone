import mongoose from 'mongoose';
import Email from "../models/email.model.js";
import { User } from "../models/user.model.js";

// ✅ Create Email
export const createEmail = async (req, res) => {
  try {
    const userId = req.id;
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const email = await Email.create({
      to,
      from: user.email,
      subject,
      message,
      userId,
    });

    return res.status(201).json({ email, message: "Email sent successfully", success: true });
  } catch (error) {
    console.error("Error creating email:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ✅ Delete Email
export const deleteEmail = async (req, res) => {
  try {
    const emailId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(emailId)) {
      return res.status(400).json({ message: "Invalid email ID", success: false });
    }

    const email = await Email.findOneAndDelete({ _id: emailId, userId: req.id });

    if (!email) {
      return res.status(404).json({ message: "Email not found", success: false });
    }

    return res.status(200).json({ message: "Email deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting email:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ✅ Get All Emails by user
export const getALLEmailById = async (req, res) => {
  try {
    const userId = req.id;
    const emails = await Email.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ emails, success: true });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ✅ Get Single Email by ID
export const getEmailById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid email ID", success: false });
    }

    const email = await Email.findById(id);

    // ✅ Check if the email belongs to the logged-in user
    if (!email || email.userId.toString() !== req.id) {
      return res.status(404).json({ message: "Email not found", success: false });
    }

    return res.status(200).json({ email, success: true });
  } catch (error) {
    console.error("Error fetching email:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};




