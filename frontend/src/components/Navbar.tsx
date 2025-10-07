import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiRefreshCw, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onRefresh?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRefresh }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

          {/* 🔄 Refresh Button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-lg hover:bg-emerald-600/20 transition-colors"
              title="Refresh Blockchain Data"
            >
              <FiRefreshCw className="text-emerald-400 text-lg" />
            </button>
          )}

          {/* 👤 Auth Links */}
          {!user ? (
            <>
              <Link
                to="/login"
                className={`${
                  location.pathname === "/login"
                    ? "text-emerald-400 font-medium"
                    : "text-gray-400 hover:text-gray-200"
                } transition-colors`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`${
                  location.pathname === "/register"
                    ? "text-emerald-400 font-medium"
                    : "text-gray-400 hover:text-gray-200"
                } transition-colors`}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4 text-sm">
              <p className="text-emerald-400 font-medium">
                👋 {user.username}
              </p>
              <span className="text-gray-400">
                💰 {user.balance.toFixed(2)} GRC
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 text-gray-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-lg transition-colors"
              >
                <FiLogOut className="text-sm" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
