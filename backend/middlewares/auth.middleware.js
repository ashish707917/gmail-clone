import jwt from "jsonwebtoken";

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided", success: false });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded?.userId || !decoded?.email) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    // Set user info on the request object
    req.id = decoded.userId;
    req.email = decoded.email;

    next(); // Continue to the route handler
  } catch (error) {
    console.error("🔐 Authentication Error:", error.message);
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};

export default isAuthenticated;
