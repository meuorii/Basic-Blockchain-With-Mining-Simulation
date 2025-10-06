import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface ValidateChainButtonProps {
  onValidate: () => Promise<void> | void;
}

const ValidateChainButton: React.FC<ValidateChainButtonProps> = ({ onValidate }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onValidate();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 ${
        loading
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-emerald-600 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
      }`}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          <span>Validating...</span>
        </>
      ) : (
        <>
          <FaCheckCircle className="text-lg" />
          <span>Validate Blockchain</span>
        </>
      )}
    </button>
  );
};

export default ValidateChainButton;
