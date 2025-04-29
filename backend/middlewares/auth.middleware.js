import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};










