import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import blockchainRoutes from "./routes/blockchainRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// 🧩 Load .env from the same directory as server.js
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

// ✅ Verify environment variables
if (!process.env.JWT_SECRET) {
  console.error("❌ Missing JWT_SECRET in .env");
  process.exit(1);
}
if (!process.env.MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env");
  process.exit(1);
}

const app = express();

// 🌐 Global middleware
app.use(cors());
app.use(express.json());

// 🧠 Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// 🚦 Routes
app.use("/api/auth", authRoutes);
app.use("/api", blockchainRoutes);

// 🧪 Debug route for development only
app.get("/api/debug/env", (req, res) => {
  res.json({
    jwtLoaded: !!process.env.JWT_SECRET,
    mongoLoaded: !!process.env.MONGO_URI,
    port: process.env.PORT || 5000,
  });
});

// 🏠 Root route
app.get("/", (req, res) => {
  res.send("🚀 Basic Blockchain API Running...");
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
