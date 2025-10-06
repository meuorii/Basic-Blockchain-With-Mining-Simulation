export interface BlockData {
  message: string;
  sender?: string;
  receiver?: string;
  amount?: number;
}

export interface Block {
  index: number;
  timestamp: string;
  data: BlockData;
  previousHash: string;
  hash: string;
  nonce: number;
}

export interface BlockchainResponse {
  chain: Block[];
}

export interface MiningResponse {
  message: string;
  block: Block;
}
