import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  minedBlocks: { type: Number, default: 0 },
  totalEarned: { type: Number, default: 0 },
});

const WalletModel = mongoose.model("Wallet", walletSchema);
export default WalletModel;
