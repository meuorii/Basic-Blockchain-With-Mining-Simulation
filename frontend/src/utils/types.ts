export interface BlockData {
  miner: string;      
  reward: number;       
  difficulty?: number;    
  message?: string;       
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
  reward: number;
  totalSupply: number;
}
