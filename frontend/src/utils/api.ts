import axios from "axios";
import type { BlockchainResponse, MiningResponse } from "./types";

// 🌐 Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Handle unauthorized / expired tokens globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Session expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ================================
// 🧱 Blockchain API Endpoints
// ================================

export const getChain = () => api.get<BlockchainResponse>("/chain");

export const mineBlock = (miner: string) =>
  api.post<MiningResponse>("/mineBlock", { miner });

export const validateChain = () =>
  api.get<{ valid: boolean; message: string }>("/validate");

// 🧍‍♂️ Auth Endpoints
export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const register = (username: string, email: string, password: string) =>
  api.post("/auth/register", { username, email, password });

export default api;
