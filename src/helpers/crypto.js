import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.SECRET_KEY || 'ful6fq';

const calculateHash = (index, previousHash, timestamp, data) => {
  return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};
const calculateHashForBlock = (block) => {
  return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};

const encryption = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};
const decryption = (ciphertext) => {
  return CryptoJS.AES.decrypt(ciphertext, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

export default { calculateHash, calculateHashForBlock, encryption, decryption }