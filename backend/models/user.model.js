import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilephoto: { type: String },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Prevent OverwriteModelError on re-import
export const User = mongoose.models.User || mongoose.model("User", userSchema);

