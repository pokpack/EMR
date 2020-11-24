import CryptoJS from 'crypto-js'

export const SECRET_KEY = process.env.SECRET_KEY || 'ful6fq';

export const calculateHash = (index, previousHash, timestamp, data) => {
  return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};
export const calculateHashForBlock = (block) => {
  return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};

export const encryption = (data) => {
  return JSON.stringify(data);
};
export const decryption = (ciphertext) => {
  return ciphertext;
};

export default { calculateHash, calculateHashForBlock, encryption, decryption }