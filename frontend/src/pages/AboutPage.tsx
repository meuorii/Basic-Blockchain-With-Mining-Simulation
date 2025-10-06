import React from "react";

const AboutPage: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto py-10 px-4 text-gray-300">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
        🧠 About This Project
      </h1>

      <p className="mb-6 text-lg leading-relaxed text-gray-400">
        The <span className="text-emerald-400 font-semibold">Basic Blockchain System with Mining Simulation</span> 
        is an educational project that demonstrates how a blockchain works internally — including block creation, 
        linking through hashes, mining via proof-of-work, and validation to ensure data integrity.
      </p>

      <div className="bg-neutral-900/60 border border-emerald-500/20 rounded-xl p-6 shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-emerald-400 mb-2">🔗 Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>🧱 Genesis Block creation at startup</li>
          <li>🔒 SHA256 hashing for immutability</li>
          <li>⛏️ Proof-of-Work mining algorithm</li>
          <li>✅ Blockchain integrity validation</li>
          <li>💾 MongoDB persistence for saved blocks</li>
          <li>⚡ Real-time mining feedback UI</li>
        </ul>
      </div>

      <div className="mt-10 bg-neutral-900/60 border border-emerald-500/20 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-emerald-400 mb-2">🧩 Tech Stack</h2>
        <ul className="grid sm:grid-cols-2 gap-2 text-gray-400">
          <li>• Frontend: React + TypeScript + Tailwind CSS</li>
          <li>• Backend: Node.js + Express.js</li>
          <li>• Database: MongoDB (Atlas)</li>
          <li>• Hashing: Node.js <code>crypto</code> module (SHA256)</li>
        </ul>
      </div>

      <div className="mt-10 bg-neutral-900/60 border border-emerald-500/20 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-emerald-400 mb-2">🎯 Purpose & Learning Outcomes</h2>
        <p className="text-gray-400 leading-relaxed">
          This system aims to provide a clear and interactive way to understand blockchain mechanics — from 
          mining and validation to chain visualization. It’s perfect for learning or presenting how 
          decentralized systems maintain integrity without a central authority.
        </p>
      </div>

      <p className="mt-10 text-center text-gray-500 text-sm">
        Built with ❤️ by <span className="text-emerald-400 font-semibold">Arnell Gwen Nuqui</span>
      </p>
    </section>
  );
};

export default AboutPage;
