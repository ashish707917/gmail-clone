import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Prevent duplicate emails
    },
    password: {
        type: String,
        required: true
    }, 
    profilephoto: {
        type: String,
        default: "https://avatar.iran.liara.run/public/boy"
    }
}, { timestamps: true }); // ✅ Fixed typo

export const User = mongoose.model("User", userSchema); // ✅ Capitalized "User"
