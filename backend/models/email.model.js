import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

// Prevent OverwriteModelError on re-import
export const Email = mongoose.models.Email || mongoose.model("Email", emailSchema);
