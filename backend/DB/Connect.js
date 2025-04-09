import mongoose from "mongoose";

const Connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // ✅ No deprecated options
        console.log("✅ MongoDB connected successfully.");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Stop the app if DB fails
    }
};

export default Connect;
