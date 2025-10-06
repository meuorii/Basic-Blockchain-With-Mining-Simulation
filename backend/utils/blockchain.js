import crypto from "crypto";
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data; // includes miner/reward info
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.data || "") +
          this.nonce
      )
      .digest("hex");
  }

  mineBlock(difficulty) {
    while (!this.hash.startsWith("0".repeat(difficulty))) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`✅ Block mined: ${this.hash}`);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4; // initial mining difficulty
    this.adjustmentInterval = 10; // blocks before difficulty increases
  }

  createGenesisBlock() {
    return new Block(
      0,
      new Date().toISOString(),
      { message: "Genesis Block", miner: "system", reward: 0 },
      "0"
    );
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }


  addBlock(data) {
    const newBlock = new Block(
      this.chain.length,
      new Date().toISOString(),
      data || { message: "Empty Block Data" },
      this.getLatestBlock().hash
    );

    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);

    // auto adjust difficulty occasionally
    this.adjustDifficulty();

    return newBlock;
  }

  minePendingBlock(data) {
    const newBlock = new Block(
      this.chain.length,
      new Date().toISOString(),
      data || { message: "Empty Block Data" },
      this.getLatestBlock().hash
    );

    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);

    // auto adjust difficulty
    this.adjustDifficulty();

    return newBlock;
  }

  adjustDifficulty() {
    if (
      this.chain.length % this.adjustmentInterval === 0 &&
      this.chain.length > 0
    ) {
      this.difficulty++;
      console.log(`⚙️ Difficulty increased to: ${this.difficulty}`);
    }
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const prev = this.chain[i - 1];

      if (current.hash !== current.calculateHash()) {
        console.log(`❌ Invalid hash at block ${i}`);
        return false;
      }

      if (current.previousHash !== prev.hash) {
        console.log(`❌ Invalid link at block ${i}`);
        return false;
      }
    }
    return true;
  }
}

export { Blockchain, Block };
