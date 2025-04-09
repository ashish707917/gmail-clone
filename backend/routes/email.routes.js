import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true
  },
  from: {
    type: String, // Add sender's email
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true // createdAt, updatedAt
});

export const Email = mongoose.model("Email", emailSchema);




