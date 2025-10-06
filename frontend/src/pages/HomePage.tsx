import React, { useEffect, useState } from "react";
import { getChain, addBlock, mineBlock, validateChain } from "../utils/api";
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

  // ✅ Fetch blockchain on mount
  const fetchChain = async () => {
    try {
      const res = await getChain();
      setChain(res.data.chain);
    } catch (error) {
      console.error("Error fetching chain:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChain();
  }, []);

  // ✅ Add block (without mining)
  const handleAddBlock = async (data: string) => {
    try {
      await addBlock(data);
      fetchChain();
      setMessage("✅ Block added successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add block.");
    }
  };

  // ✅ Mine block (with proof of work)
  const handleMineBlock = async (data: string) => {
    try {
      setMining(true);
      setMessage("⛏️ Mining in progress... Please wait.");
      const res = await mineBlock(data);
      setMessage(`🎉 ${res.data.message}`);
      fetchChain();
    } catch (error) {
      console.error(error);
      setMessage("❌ Mining failed.");
    } finally {
      setMining(false);
    }
  };

  // ✅ Validate chain integrity
  const handleValidate = async () => {
    try {
      const res = await validateChain();
      const valid = res.data.valid;
      setMessage(valid ? "✅ Blockchain is valid!" : "⚠️ Blockchain is invalid!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Validation error.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-emerald-400 text-center">
        🔗 Basic Blockchain System with Mining Simulation
      </h1>
      <p className="text-center text-gray-400 max-w-2xl mx-auto">
        Add data blocks, mine them using Proof of Work, and validate your blockchain’s integrity in real time.
      </p>

      {/* 🧩 Add / Mine Block Form */}
      <AddBlockForm onAdd={handleAddBlock} onMine={handleMineBlock} mining={mining} />

      {/* ⛏️ Mining Status */}
      {message && <MiningStatus message={message} />}

      {/* 🧱 Blockchain Explorer */}
      {loading ? (
        <p className="text-center text-gray-400 animate-pulse">Loading blockchain...</p>
      ) : (
        <BlockchainExplorer chain={chain} />
      )}

      {/* ✅ Validate Chain Button */}
      <div className="flex justify-center pt-4">
        <ValidateChainButton onValidate={handleValidate} />
      </div>
    </div>
  );
};

export default HomePage;
