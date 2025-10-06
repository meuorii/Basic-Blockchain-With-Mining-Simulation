import React from "react";

interface MiningStatusProps {
  message: string;
}

const MiningStatus: React.FC<MiningStatusProps> = ({ message }) => {
  // Determine message color based on its type
  const getStatusColor = () => {
    if (message.includes("Mining") || message.includes("progress")) return "text-yellow-400";
    if (message.includes("success") || message.includes("🎉") || message.includes("✅")) return "text-emerald-400";
    if (message.includes("invalid") || message.includes("error") || message.includes("❌")) return "text-red-400";
    return "text-gray-300";
  };

  return (
    <div className="flex justify-center mt-4">
      <div
        className={`text-center text-sm md:text-base font-medium bg-neutral-900/60 border border-white/10 px-6 py-3 rounded-lg shadow-md animate-fade-in ${getStatusColor()}`}
      >
        {message.includes("Mining in progress") ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-t-transparent border-emerald-400 rounded-full animate-spin"></div>
            <span>{message}</span>
          </div>
        ) : (
          message
        )}
      </div>
    </div>
  );
};

export default MiningStatus;
