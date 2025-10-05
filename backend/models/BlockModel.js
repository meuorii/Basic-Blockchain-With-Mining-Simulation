import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
  index: Number,
  timestamp: String,
  data: Object,
  previousHash: String,
  hash: String,
  nonce: Number,
});

export default mongoose.model("Block", blockSchema);
