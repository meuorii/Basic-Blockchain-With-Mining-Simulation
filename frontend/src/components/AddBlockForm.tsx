import React, { useState } from "react";

interface AddBlockFormProps {
  onAdd: (data: string) => void;
  onMine: (data: string) => void;
  mining: boolean;
}

const AddBlockForm: React.FC<AddBlockFormProps> = ({ onAdd, onMine, mining }) => {
  const [data, setData] = useState<string>("");

  const handleAdd = () => {
    if (!data.trim()) return alert("⚠️ Please enter some data first!");
    onAdd(data);
    setData("");
  };

  const handleMine = () => {
    if (!data.trim()) return alert("⚠️ Please enter some data first!");
    onMine(data);
    setData("");
  };

  return (
    <div className="bg-neutral-900/70 border border-emerald-500/20 rounded-xl p-6 shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-emerald-400 mb-4 text-center">
        🧩 Add or Mine a New Block
      </h2>

      {/* Input Field */}
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter block data (e.g., transaction info, message, etc.)"
        className="w-full p-3 bg-neutral-800 border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        rows={3}
      />

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-5">
        <button
          onClick={handleAdd}
          disabled={mining}
          className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition disabled:opacity-50"
        >
          ➕ Add Block
        </button>

        <button
          onClick={handleMine}
          disabled={mining}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition disabled:opacity-50"
        >
          {mining ? "⛏️ Mining..." : "⛏️ Mine Block"}
        </button>
      </div>
    </div>
  );
};

export default AddBlockForm;
