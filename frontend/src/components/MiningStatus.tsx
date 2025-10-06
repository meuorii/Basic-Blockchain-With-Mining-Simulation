import React from "react";

interface MiningStatusProps {
  message: string;
}

const MiningStatus: React.FC<MiningStatusProps> = ({ message }) => {
  const isMining = message.toLowerCase().includes("mining");
  const isSuccess = message.toLowerCase().includes("earned") || message.toLowerCase().includes("success");
  const isError = message.toLowerCase().includes("fail") || message.toLowerCase().includes("error");

  return (
    <div
      className={`max-w-lg mx-auto mt-6 p-4 rounded-xl text-center transition-all duration-500 shadow-md border 
        ${
          isMining
            ? "bg-emerald-900/10 border-emerald-400/20 shadow-emerald-500/20 animate-pulse"
            : isSuccess
            ? "bg-emerald-900/20 border-emerald-400/40 shadow-emerald-500/30"
            : isError
            ? "bg-red-900/10 border-red-400/30 shadow-red-500/20"
            : "bg-neutral-800/50 border-white/10"
        }`}
    >
      {isMining ? (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-10 h-10 border-4 border-t-emerald-400 border-emerald-800 rounded-full animate-spin"></div>
          <p className="text-emerald-400 font-medium text-lg">{message}</p>
          <p className="text-gray-400 text-sm italic">Proof of Work in progress...</p>
        </div>
      ) : isSuccess ? (
        <div className="space-y-2">
          <p className="text-emerald-400 text-lg font-semibold animate-pulse">{message}</p>
          <p className="text-gray-400 text-sm italic">Block successfully mined and added to the chain!</p>
        </div>
      ) : isError ? (
        <div className="space-y-2">
          <p className="text-red-400 text-lg font-semibold">{message}</p>
          <p className="text-gray-400 text-sm italic">Something went wrong during mining.</p>
        </div>
      ) : (
        <p className="text-gray-300">{message}</p>
      )}
    </div>
  );
};

export default MiningStatus;
