import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";

interface NavbarProps {
  onRefresh?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRefresh }) => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-emerald-500/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 🧱 Brand / Title */}
        <Link
          to="/"
          className="text-emerald-400 font-bold text-lg hover:text-emerald-300 transition-colors"
        >
          🧱 Blockchain Simulator
        </Link>

        {/* 🌐 Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "text-emerald-400 font-medium"
                : "text-gray-400 hover:text-gray-200"
            } transition-colors`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`${
              location.pathname === "/about"
                ? "text-emerald-400 font-medium"
                : "text-gray-400 hover:text-gray-200"
            } transition-colors`}
          >
            About
          </Link>

          {/* 🔄 Refresh Button (optional) */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-lg hover:bg-emerald-600/20 transition-colors"
              title="Refresh Blockchain Data"
            >
              <FiRefreshCw className="text-emerald-400 text-lg" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
