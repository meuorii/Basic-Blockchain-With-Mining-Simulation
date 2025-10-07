import React, { useEffect, useState } from "react";
import { getChain, mineBlock, validateChain } from "../utils/api";
import type { Block } from "../utils/types";
import BlockchainExplorer from "../components/BlockchainExplorer";
import MiningStatus from "../components/MiningStatus";
import ValidateChainButton from "../components/ValidateChainButton";
import { useAuth } from "../context/AuthContext";

const HomePage: React.FC = () => {
  const { user } = useAuth(); // ✅ Get logged-in miner
  const [chain, setChain] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [mining, setMining] = useState(false);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState<number>(user?.balance || 0);

  // ✅ Fetch blockchain and update balance
  const fetchChain = async () => {
    try {
      const res = await getChain();
      setChain(res.data.chain);

      if (user) {
        const totalReward = res.data.chain
          .filter((b: Block) => b.data?.miner === user.username)
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
  }, [user]);

  // ✅ Mine new block (requires auth)
  const handleMineBlock = async () => {
    if (!user) {
      setMessage("⚠️ Please log in to start mining!");
      return;
    }

    try {
      setMining(true);
      setMessage("⛏️ Mining in progress... please wait...");

      const res = await mineBlock(user.username);
      setMessage(res.data.message);

      // Update balance locally
      setBalance((prev) => prev + res.data.reward);
      fetchChain();
    } catch (error) {
      console.error(error);
      setMessage("❌ Mining failed.");
    } finally {
      setMining(false);
    }
  };

  // ✅ Validate blockchain integrity
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
        💎 Blockchain Mining Simulator
      </h1>
      <p className="text-center text-gray-400 max-w-2xl mx-auto">
        Mine GRIND tokens by verifying transactions on the blockchain. Each block mined rewards you with coins.
      </p>

      {/* 💰 Wallet Balance */}
      {user ? (
        <div className="text-center bg-emerald-800/10 border border-emerald-500/20 py-3 px-6 rounded-lg w-fit mx-auto">
          <p className="text-emerald-400 font-semibold">
            🪙 Wallet ({user.username}):{" "}
            <span className="text-white">{balance.toFixed(2)} GRIND</span>
          </p>
        </div>
      ) : (
        <p className="text-center text-yellow-400">
          ⚠️ Log in or register to start mining blocks.
        </p>
      )}

      {/* ⛏️ Mine Button */}
      <div className="flex justify-center">
        <button
          onClick={handleMineBlock}
          disabled={mining || !user}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
            mining
              ? "bg-gray-700 cursor-not-allowed"
              : user
              ? "bg-emerald-600 hover:bg-emerald-500"
              : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          {mining ? "⛏️ Mining..." : "Start Mining"}
        </button>
      </div>

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
