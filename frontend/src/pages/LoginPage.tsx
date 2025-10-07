import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Use the hook, not AuthContext
import api from "../utils/api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Destructure the login function directly
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      login(token, user); // ✅ AuthContext handles saving token + user
      navigate("/");

    } catch (err) {
      console.error(err);
      // ✅ Narrow the error type safely
      const message =
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-900 to-black text-gray-200 px-4">
      <div className="w-full max-w-md bg-neutral-900/80 border border-emerald-500/20 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-emerald-400 mb-6">
          🔐 Miner Login
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-200"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-200"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              loading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-500 text-sm mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-400 hover:underline hover:text-emerald-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
