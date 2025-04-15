import mongoose from 'mongoose';
import { Email } from "../models/email.model.js";
import { User } from "../models/user.model.js";

// Helper function for handling errors
const handleError = (res, error, customMessage = "Internal Server Error") => {
  console.error(error);
  return res.status(500).json({ message: customMessage, success: false });
};

// ✅ Create Email
export const createEmail = async (req, res) => {
  try {
    const userId = req.id;  // Ensure `req.id` is present (comes from authentication middleware)
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated", success: false });
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
    handleError(res, error, "Error creating email");
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
    handleError(res, error, "Error deleting email");
  }
};

// ✅ Get All Emails by User
export const getALLEmailById = async (req, res) => {
  try {
    const userId = req.id;
    
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated", success: false });
    }

    const emails = await Email.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ emails, success: true });
  } catch (error) {
    handleError(res, error, "Error fetching emails");
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
    handleError(res, error, "Error fetching email");
  }
};




