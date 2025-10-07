import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Load and verify the JWT secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET not found in environment variables!");
  process.exit(1); // Stop the server immediately
}

// 🔒 Middleware to protect routes
export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];
    console.log("🔍 Incoming Token:", token.slice(0, 20) + "...");

    // ✅ Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token verified for user ID:", decoded.id);

    // ✅ Get user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("❌ User not found for decoded ID:", decoded.id);
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user object to request
    next();
  } catch (err) {
    console.error("❌ JWT Verification Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
