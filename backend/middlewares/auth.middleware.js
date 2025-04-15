import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided.", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id; // Attach user ID from the token to the request object
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid token.", success: false });
  }
};





