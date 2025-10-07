import express from "express";
import { Blockchain, Block } from "../utils/blockchain.js";
import { protect } from "../middleware/authMiddleware.js";
import BlockModel from "../models/BlockModel.js";
import WalletModel from "../models/WalletModel.js";
import User from "../models/UserModel.js";

const router = express.Router();
const blockchain = new Blockchain();

// 🪙 Base reward per mined block (in GrindCoins)
const BASE_REWARD = 10;
let totalSupply = 0; // ⚠️ temporary (better to persist in DB later)

// =====================================
// 🔄 INITIALIZE BLOCKCHAIN FROM MONGODB
// =====================================
(async () => {
  try {
    const savedBlocks = await BlockModel.find().sort({ index: 1 });

    if (savedBlocks.length > 0) {
      blockchain.chain = savedBlocks.map(
        (b) => new Block(b.index, b.timestamp, b.data, b.previousHash)
      );

      blockchain.chain.forEach((block, i) => {
        block.hash = savedBlocks[i].hash;
        block.nonce = savedBlocks[i].nonce;
      });

      console.log(`🗃️ Loaded ${savedBlocks.length} blocks from MongoDB`);
    } else {
      await BlockModel.create(blockchain.chain[0]);
      console.log("✨ Created Genesis Block in MongoDB");
    }
  } catch (err) {
    console.error("❌ Failed to load blockchain:", err.message);
  }
})();

// ======================
// 📜 GET FULL CHAIN
// ======================
router.get("/chain", async (req, res) => {
  try {
    res.json({ chain: blockchain.chain });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching blockchain",
      error: err.message,
    });
  }
});

// ======================
// ➕ ADD BLOCK (manual)
// ======================
router.post("/addBlock", async (req, res) => {
  try {
    const { data } = req.body;
    const newBlock = blockchain.addBlock(data || "Manual block added");
    await BlockModel.create(newBlock);

    res.json({
      message: "✅ Block added successfully",
      block: newBlock,
    });
  } catch (err) {
    console.error("❌ Add block error:", err);
    res.status(500).json({
      message: "❌ Failed to add block",
      error: err.message,
    });
  }
});

// ======================
// ⛏️ MINE BLOCK (AUTH)
// ======================
router.post("/mineBlock", protect, async (req, res) => {
  try {
    const miner = req.user.username || req.user.email;
    const difficulty = blockchain.difficulty;

    // ⏳ simulate mining delay (grind)
    const miningTime = difficulty * 1000 + Math.floor(Math.random() * 2000);
    await new Promise((resolve) => setTimeout(resolve, miningTime));

    // 💰 calculate reward (base + bonus)
    const bonus = Math.floor(Math.random() * 50);
    const reward = BASE_REWARD + bonus;

    // 🧱 mine the block
    const minedBlock = blockchain.minePendingBlock({
      miner,
      reward,
      difficulty,
      message: `Block mined by ${miner} — earned ${reward} GRC`,
    });

    await BlockModel.create(minedBlock);

    // 💼 update wallet (separate collection)
    const wallet = await WalletModel.findOneAndUpdate(
      { address: miner },
      {
        $inc: { balance: reward, minedBlocks: 1, totalEarned: reward },
      },
      { upsert: true, new: true }
    );

    // 🔄 update user balance (linked to auth)
    req.user.balance += reward;
    await req.user.save();

    totalSupply += reward;

    res.json({
      message: `🎉 Successfully mined a block! +${reward} GRC`,
      block: minedBlock,
      reward,
      walletBalance: wallet.balance,
      totalSupply,
    });
  } catch (err) {
    console.error("❌ Mining error:", err);
    res.status(500).json({
      message: "❌ Mining failed",
      error: err.message,
    });
  }
});

// ======================
// 💰 GET ALL WALLETS
// ======================
router.get("/wallets", async (req, res) => {
  try {
    const wallets = await WalletModel.find().sort({ balance: -1 });
    res.json({ totalSupply, wallets });
  } catch (err) {
    res.status(500).json({
      message: "❌ Failed to fetch wallets",
      error: err.message,
    });
  }
});

// ======================
// ✅ VALIDATE CHAIN
// ======================
router.get("/validate", (req, res) => {
  try {
    const isValid = blockchain.isChainValid();
    res.json({
      valid: isValid,
      message: isValid
        ? "✅ Blockchain integrity verified!"
        : "⚠️ Blockchain is invalid!",
    });
  } catch (err) {
    res.status(500).json({
      message: "❌ Validation error",
      error: err.message,
    });
  }
});

export default router;
