import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ use the hook instead of { AuthContext }
import api from "../utils/api";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login from context

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("⚠️ Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      const { token, user } = res.data;
      login(token, user); // ✅ Log in immediately after registration
      navigate("/");

    } catch (err) {
      console.error(err);
      // ✅ Narrow the error type safely (avoid `any`)
      const message =
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Registration failed. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-900 to-black text-gray-200 px-4">
      <div className="w-full max-w-md bg-neutral-900/80 border border-emerald-500/20 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-emerald-400 mb-6">
          🧑‍💻 Create Miner Account
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-200"
              placeholder="Your unique miner name"
            />
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-500 text-sm mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-400 hover:underline hover:text-emerald-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
