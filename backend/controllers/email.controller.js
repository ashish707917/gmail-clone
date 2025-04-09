import { Email } from "../models/email.model.js";
import { User } from "../models/user.model.js";

// ✅ Create Email
export const createEmail = async (req, res) => {
  try {
    const userId = req.id;
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const email = await Email.create({
      to,
      subject,
      message,
      userId
    });

    return res.status(201).json({
      email,
      message: "Email sent successfully",
      success: true
    });

  } catch (error) {
    console.error("Error creating email:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ✅ Delete Email
export const deleteEmail = async (req, res) => {
  try {
    const emailId = req.params.id;

    if (!emailId) {
      return res.status(400).json({ message: "Email ID is required", success: false });
    }

    const email = await Email.findOneAndDelete({ _id: emailId, userId: req.id });

    if (!email) {
      return res.status(404).json({ message: "Email not found", success: false });
    }

    return res.status(200).json({
      message: "Email Deleted Successfully",
      success: true
    });

  } catch (error) {
    console.error("Error deleting email:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ✅ Get All Sent Emails (by logged-in user)
export const getALLEmailById = async (req, res) => {
  try {
    const userId = req.id;

    // Show only emails SENT BY the logged-in user
    const emails = await Email.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ emails, success: true });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


