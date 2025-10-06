import axios from "axios";
import type { BlockchainResponse, MiningResponse } from "./types";

// 🌐 Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
});


export type BlockPayload = Record<string, unknown> | string;
export const getChain = () => api.get<BlockchainResponse>("/chain");

export const addBlock = (data: BlockPayload) =>
  api.post<{ message: string }>("/addBlock", { data });

export const mineBlock = (data: BlockPayload) =>
  api.post<MiningResponse>("/mineBlock", { data });

export const validateChain = () =>
  api.get<{ valid: boolean; message: string }>("/validate");

export default api;
