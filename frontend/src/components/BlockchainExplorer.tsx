import React from "react";
import type { Block } from "../utils/types";

interface Props {
  chain: Block[];
}

const BlockchainExplorer: React.FC<Props> = ({ chain }) => {
  if (!chain || chain.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No blocks available. Try mining one!
      </p>
    );
  }

  return (
    <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chain.map((block) => (
        <div
          key={block.index}
          className="bg-neutral-900/70 border border-emerald-500/20 rounded-2xl p-5 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-emerald-400">
              Block #{block.index}
            </h3>
            {block.index === 0 && (
              <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                Genesis
              </span>
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <span className="font-semibold text-gray-400">⏰ Timestamp:</span>{" "}
              {new Date(block.timestamp).toLocaleString()}
            </p>

            <p>
              <span className="font-semibold text-gray-400">📦 Data:</span>{" "}
              <span className="break-words text-gray-200">
                {typeof block.data === "object"
                  ? JSON.stringify(block.data)
                  : block.data}
              </span>
            </p>

            <p className="break-all text-gray-400">
              <span className="font-semibold text-gray-400">🔗 Prev Hash:</span>{" "}
              {block.previousHash
                ? `${block.previousHash.slice(0, 20)}...`
                : "N/A"}
            </p>

            <p className="break-all text-gray-400">
              <span className="font-semibold text-gray-400">#️⃣ Hash:</span>{" "}
              {block.hash ? `${block.hash.slice(0, 20)}...` : "N/A"}
            </p>

            <p>
              <span className="font-semibold text-gray-400">⚙️ Nonce:</span>{" "}
              {block.nonce}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockchainExplorer;
