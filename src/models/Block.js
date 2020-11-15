import crypto from '../helpers/crypto'
export default class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.hash = hash.toString();
    this.data = data
  }
  getData() {
    return crypto.decryption(this.data)
  }
}
