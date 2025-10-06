import axios from "axios";
import type { BlockchainResponse, MiningResponse } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
});

export const getChain = () => api.get<BlockchainResponse>("/chain");

export const mineBlock = (miner: string) =>
  api.post<MiningResponse>("/mineBlock", { miner });

export const validateChain = () =>
  api.get<{ valid: boolean; message: string }>("/validate");

export default api;
