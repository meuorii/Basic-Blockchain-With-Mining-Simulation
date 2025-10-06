import React, { useState } from "react";

interface AddBlockFormProps {
  onMine: (miner: string) => void;
  mining: boolean;
}

const AddBlockForm: React.FC<AddBlockFormProps> = ({ onMine, mining }) => {
  const [miner, setMiner] = useState<string>("");

  const handleMine = () => {
    if (!miner.trim()) return alert("⚠️ Please enter your miner name first!");
    onMine(miner);
  };

  return (
    <div className="bg-neutral-900/70 border border-emerald-500/20 rounded-xl p-6 shadow-md max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold text-emerald-400 mb-4">
        💎 Start Mining Coins
      </h2>

      {/* Miner Name Input */}
      <input
        type="text"
        value={miner}
        onChange={(e) => setMiner(e.target.value)}
        placeholder="Enter your miner name (e.g., Gwen)"
        className="w-full p-3 bg-neutral-800 border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
      />

      {/* Mining Button */}
      <button
        onClick={handleMine}
        disabled={mining}
        className={`w-full mt-5 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
          mining
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-500/30"
        }`}
      >
        {mining ? "⛏️ Mining..." : "🚀 Start Mining"}
      </button>

      {/* Optional Hint */}
      <p className="text-gray-500 text-sm mt-3">
        Each successful mine earns you <span className="text-emerald-400 font-semibold">GRIND</span> tokens!
      </p>
    </div>
  );
};

export default AddBlockForm;
