import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-950 text-gray-200 font-sans">
        {/* ✅ Top Navigation */}
        <Navbar />

        {/* ✅ Page Container */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        {/* ✅ Footer (optional) */}
        <footer className="text-center text-gray-500 py-6 text-sm border-t border-white/10">
          © {new Date().getFullYear()} Basic Blockchain System with Mining Simulation
        </footer>
      </div>
    </Router>
  );
};

export default App;
