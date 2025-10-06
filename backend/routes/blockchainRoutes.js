import express from "express";
import { Blockchain, Block } from "../utils/blockchain.js";
import BlockModel from "../models/BlockModel.js";
import WalletModel from "../models/WalletModel.js"; // ✅ new model for miner wallets

const router = express.Router();
const blockchain = new Blockchain();

// Base reward (in GrindCoins)
const BASE_REWARD = 10;
let totalSupply = 0; // total GrindCoins in circulation


(async () => {
  try {
    const savedBlocks = await BlockModel.find().sort({ index: 1 });
    if (savedBlocks.length > 0) {
      blockchain.chain = savedBlocks.map(
        (b) =>
          new Block(b.index, b.timestamp, b.data, b.previousHash)
      );

      // restore hashes + nonces
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
    console.error("❌ Failed to load blockchain from MongoDB:", err.message);
  }
})();


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

router.post("/addBlock", async (req, res) => {
  try {
    const { data } = req.body;
    const newBlock = blockchain.addBlock(data);
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

router.post("/mineBlock", async (req, res) => {
  try {
    const { data, miner } = req.body;
    if (!miner) {
      return res.status(400).json({ message: "❌ Miner address is required." });
    }

    // Simulate grind/airdrop waiting time ⏳
    const difficulty = blockchain.difficulty;
    const miningTime =
      difficulty * 1000 + Math.floor(Math.random() * 2000); // random grind time
    await new Promise((resolve) => setTimeout(resolve, miningTime));

    // Random airdrop bonus 🎁
    const bonus = Math.floor(Math.random() * 50);
    const reward = BASE_REWARD + bonus;

    // Mine block
    const minedBlock = blockchain.minePendingBlock({
      miner,
      reward,
      message: data || "Mined block",
    });

    await BlockModel.create(minedBlock);

    // Update or create miner wallet 💰
    await WalletModel.updateOne(
      { address: miner },
      {
        $inc: {
          balance: reward,
          minedBlocks: 1,
          totalEarned: reward,
        },
      },
      { upsert: true }
    );

    totalSupply += reward;

    res.json({
      message: `🎉 Block mined successfully by ${miner}! Reward: ${reward} GRC`,
      block: minedBlock,
      reward,
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


router.get("/validate", (req, res) => {
  try {
    const isValid = blockchain.isChainValid();
    res.json({
      valid: isValid,
      message: isValid
        ? "✅ Blockchain is valid"
        : "⚠️ Blockchain is invalid",
    });
  } catch (err) {
    res.status(500).json({
      message: "❌ Validation error",
      error: err.message,
    });
  }
});

export default router;
