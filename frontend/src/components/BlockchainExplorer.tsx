import React from "react";
import type { Block } from "../utils/types";

interface Props {
  chain: Block[];
}

const BlockchainExplorer: React.FC<Props> = ({ chain }) => {
  if (!chain || chain.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No blocks mined yet. Click “Start Mining” to begin earning GRIND tokens!
      </p>
    );
  }

  return (
    <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chain.map((block) => {
        const { miner, reward, difficulty, message } = block.data || {};

        return (
          <div
            key={block.index}
            className="bg-neutral-900/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
          >
            {/* Block Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-emerald-400">
                🧱 Block #{block.index}
              </h3>
              {block.index === 0 ? (
                <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                  Genesis
                </span>
              ) : (
                <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-lg">
                  Nonce: {block.nonce}
                </span>
              )}
            </div>

            {/* Block Info */}
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <span className="font-semibold text-gray-400">⏰ Timestamp:</span>{" "}
                {new Date(block.timestamp).toLocaleString()}
              </p>

              {miner && (
                <p>
                  <span className="font-semibold text-gray-400">👷 Miner:</span>{" "}
                  <span className="text-white font-medium">{miner}</span>
                </p>
              )}

              {reward !== undefined && (
                <p>
                  <span className="font-semibold text-gray-400">💰 Reward:</span>{" "}
                  <span className="text-yellow-400 font-semibold">
                    {reward} GRIND
                  </span>
                </p>
              )}

              {difficulty !== undefined && (
                <p>
                  <span className="font-semibold text-gray-400">🧮 Difficulty:</span>{" "}
                  <span className="text-gray-200">{difficulty}</span>
                </p>
              )}

              {message && (
                <p className="italic text-gray-400">“{message}”</p>
              )}

              {/* Hashes */}
              <div className="mt-3 text-xs break-all text-gray-400 space-y-1">
                <p>
                  <span className="font-semibold text-gray-400">🔗 Prev Hash:</span>{" "}
                  {block.previousHash
                    ? `${block.previousHash.slice(0, 25)}...`
                    : "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">#️⃣ Hash:</span>{" "}
                  {block.hash ? `${block.hash.slice(0, 25)}...` : "N/A"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlockchainExplorer;
