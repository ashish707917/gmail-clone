import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Email = mongoose.models.Email || mongoose.model("Email", emailSchema);
