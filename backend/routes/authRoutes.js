import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // ✅ Fallback for dev

// 🧩 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "⚠️ All fields are required." });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "⚠️ User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // ✅ Create JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "3d" });

    // ✅ Remove password before sending
    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      message: "✅ Registered successfully!",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "❌ Server error during registration." });
  }
});

// 🔑 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "⚠️ Email and password required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "❌ User not found." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "⚠️ Invalid credentials." });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "3d" });

    const { password: _, ...safeUser } = user.toObject();

    res.json({
      message: "✅ Login successful!",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "❌ Server error during login." });
  }
});

export default router;
