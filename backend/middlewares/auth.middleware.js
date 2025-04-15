import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // ✅ Also check Authorization header
    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded?.userId || !decoded?.email) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    req.id = decoded.userId;
    req.email = decoded.email;

    next();
  } catch (error) {
    console.error("🔐 Authentication Error:", error.message);
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};

export default isAuthenticated;

