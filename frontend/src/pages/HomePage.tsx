import React, { useEffect, useState } from "react";
import { getChain, mineBlock, validateChain } from "../utils/api";
import type { Block } from "../utils/types";
import BlockchainExplorer from "../components/BlockchainExplorer";
import AddBlockForm from "../components/AddBlockForm";
import MiningStatus from "../components/MiningStatus";
import ValidateChainButton from "../components/ValidateChainButton";

const HomePage: React.FC = () => {
  const [chain, setChain] = useState<Block[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mining, setMining] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [minerName, setMinerName] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  // ✅ Fetch blockchain from backend
  const fetchChain = async () => {
    try {
      const res = await getChain();
      setChain(res.data.chain);

      // 💰 Update wallet balance if minerName is known
      if (minerName) {
        const totalReward = res.data.chain
          .filter((b: Block) => b.data?.miner === minerName)
          .reduce((sum, b) => sum + (b.data?.reward || 0), 0);
        setBalance(totalReward);
      }
    } catch (error) {
      console.error("Error fetching chain:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChain();
  }, [minerName]);

  // ✅ Handle mining (simulate crypto mining)
  const handleMineBlock = async (miner: string) => {
    try {
      if (!miner) {
        setMessage("⚠️ Please enter your miner name before mining!");
        return;
      }
      setMining(true);
      setMessage("⛏️ Mining in progress... please wait...");
      setMinerName(miner);

      const res = await mineBlock(miner);
      setMessage(res.data.message);
      fetchChain();
    } catch (error) {
      console.error(error);
      setMessage("❌ Mining failed.");
    } finally {
      setMining(false);
    }
  };

  // ✅ Validate chain
  const handleValidate = async () => {
    try {
      const res = await validateChain();
      setMessage(
        res.data.valid
          ? "✅ Blockchain is valid!"
          : "⚠️ Blockchain integrity compromised!"
      );
    } catch (error) {
      console.error(error);
      setMessage("❌ Validation error.");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-emerald-400 text-center">
        💎 Basic Blockchain Mining Simulator
      </h1>
      <p className="text-center text-gray-400 max-w-2xl mx-auto">
        Click “Start Mining” to earn GRIND tokens and build the blockchain.
      </p>

      {/* 💰 Wallet Balance */}
      {minerName && (
        <div className="text-center bg-emerald-800/10 border border-emerald-500/20 py-3 px-6 rounded-lg w-fit mx-auto">
          <p className="text-emerald-400 font-semibold">
            🪙 Wallet ({minerName}):{" "}
            <span className="text-white">{balance.toFixed(2)} GRIND</span>
          </p>
        </div>
      )}

      {/* ⛏️ Start Mining Form */}
      <AddBlockForm onMine={handleMineBlock} mining={mining} />

      {/* 🧠 Mining Status */}
      {message && <MiningStatus message={message} />}

      {/* 🔗 Blockchain Explorer */}
      {loading ? (
        <p className="text-center text-gray-400 animate-pulse">
          Loading blockchain...
        </p>
      ) : (
        <BlockchainExplorer chain={chain} />
      )}

      {/* ✅ Validate Chain */}
      <div className="flex justify-center pt-4">
        <ValidateChainButton onValidate={handleValidate} />
      </div>
    </div>
  );
};

export default HomePage;
