import React from "react";
import { useAuth } from "../context/AuthContext";

interface AddBlockFormProps {
  onMine: (miner: string) => void;
  mining: boolean;
}

const AddBlockForm: React.FC<AddBlockFormProps> = ({ onMine, mining }) => {
  const { user } = useAuth();

  const handleMine = () => {
    if (!user) {
      alert("⚠️ Please log in first to start mining!");
      return;
    }
    onMine(user.username);
  };

  return (
    <div className="bg-neutral-900/70 border border-emerald-500/20 rounded-xl p-6 shadow-md max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold text-emerald-400 mb-4">
        💎 Start Mining Coins
      </h2>

      {/* 🧍 Miner Info */}
      {user ? (
        <p className="text-gray-300 mb-3">
          Logged in as{" "}
          <span className="text-emerald-400 font-semibold">{user.username}</span>
        </p>
      ) : (
        <p className="text-yellow-400 mb-3 text-sm">
          ⚠️ Please log in or register to mine coins.
        </p>
      )}

      {/* Mining Button */}
      <button
        onClick={handleMine}
        disabled={mining || !user}
        className={`w-full mt-3 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
          mining
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : user
            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-500/30"
            : "bg-gray-800 text-gray-500 cursor-not-allowed"
        }`}
      >
        {mining ? "⛏️ Mining..." : user ? "🚀 Start Mining" : "🔒 Login Required"}
      </button>

      {/* Optional Hint */}
      <p className="text-gray-500 text-sm mt-3">
        Each successful mine rewards{" "}
        <span className="text-emerald-400 font-semibold">GRC tokens</span> 💰
      </p>
    </div>
  );
};

export default AddBlockForm;
