import express from "express";
import { Blockchain } from "../utils/blockchain.js";
import BlockModel from "../models/BlockModel.js";

const router = express.Router();
const blockchain = new Blockchain();

// GET: full chain
router.get("/chain", async (req, res) => {
  res.json({ chain: blockchain.chain });
});

// POST: add block without mining
router.post("/addBlock", (req, res) => {
  const { data } = req.body;
  const newBlock = blockchain.addBlock({
    index: blockchain.chain.length,
    timestamp: Date.now(),
    data,
  });
  res.json({ message: "Block added", newBlock });
});

// POST: mine new block
router.post("/mineBlock", async (req, res) => {
  const { data } = req.body;
  const mined = blockchain.minePendingBlock(data);

  // optional: save to DB
  if (BlockModel) await BlockModel.create(mined);

  res.json({ message: "Block mined successfully", block: mined });
});

// GET: validate blockchain
router.get("/validate", (req, res) => {
  const isValid = blockchain.isChainValid();
  res.json({
    valid: isValid,
    message: isValid ? "✅ Blockchain is valid" : "❌ Blockchain is invalid",
  });
});

export default router;
