import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blockchainRoutes from "./routes/blockchainRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// connect to MongoDB
connectDB();

// routes
app.use("/api", blockchainRoutes);

// root route
app.get("/", (req, res) => {
  res.send("🚀 Basic Blockchain API Running...");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
