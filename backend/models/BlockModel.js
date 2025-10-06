import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
  index: Number,
  timestamp: String,
  data: mongoose.Schema.Types.Mixed,
  previousHash: String,
  hash: String,
  nonce: Number,
});

const BlockModel = mongoose.model("Block", blockSchema);
export default BlockModel;
