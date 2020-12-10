
import { fsmanager, crypto, checkdifference } from '../helpers'
import { write, broadcast } from '../socket_servers'

export const MessageType = {
  QUERY_LATEST: 0,
  QUERY_ALL: 1,
  RESPONSE_BLOCKCHAIN: 2
};

const getLatestBlock = (blockchain) => blockchain[blockchain.length - 1];

export const queryChainLengthMsg = () => ({ 'type': MessageType.QUERY_LATEST });
const queryAllMsg = () => ({ 'type': MessageType.QUERY_ALL });
export const responseChainMsg = (blockchain) => ({
  'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(blockchain)
});
export const responseLatestMsg = (blockchain) => ({
  'type': MessageType.RESPONSE_BLOCKCHAIN,
  'data': JSON.stringify([getLatestBlock(blockchain)])
});


const isValidNewBlock = (newBlock, previousBlock) => {
  if (previousBlock.index + 1 !== newBlock.index) {
    console.log('invalid index');
    return false;
  } else if (previousBlock.hash !== newBlock.previousHash) {
    console.log('invalid previoushash');
    return false;
  } else if (crypto.calculateHashForBlock(newBlock) !== newBlock.hash) {
    console.log(typeof (newBlock.hash) + ' ' + typeof crypto.calculateHashForBlock(newBlock));
    console.log('invalid hash: ' + crypto.calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
    return false;
  }
  return true;
};


const isValidChain = (blockchainToValidate, getGenesisBlock) => {
  if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(getGenesisBlock())) {
    return false;
  }
  const tempBlocks = [blockchainToValidate[0]];
  for (let i = 1; i < blockchainToValidate.length; i++) {
    if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
      tempBlocks.push(blockchainToValidate[i]);
    } else {
      return false;
    }
  }
  return true;
};

const replaceChain = (newBlocks, blockchain, sockets, getGenesisBlock) => { //ไว้ replaceChain กับ node อื่นๆ
  if (isValidChain(newBlocks, getGenesisBlock) && newBlocks.length > blockchain.length) {
    console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
    blockchain = newBlocks;
    broadcast(sockets, responseLatestMsg(blockchain));
  } else {
    console.log('Received blockchain invalid');
  }
  return blockchain
};


export const handleBlockchainResponse = (message, blockchain, sockets, getGenesisBlock) => {
  const receivedBlocks = JSON.parse(message.data).sort((b1, b2) => (b1.index - b2.index));
  const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
  const latestBlockHeld = getLatestBlock(blockchain);
  if (latestBlockReceived.index > latestBlockHeld.index) {
    console.log('blockchain possibly behind. We got: ' + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);
    if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
      console.log("We can append the received block to our chain");
      checkdifference(new Date(latestBlockReceived.timestamp), latestBlockReceived.index); // for test
      blockchain.push(latestBlockReceived);
      broadcast(sockets, responseLatestMsg(blockchain));
    } else if (receivedBlocks.length === 1) {
      console.log("We have to query the chain from our peer");
      broadcast(sockets, queryAllMsg());
    } else {
      console.log("Received blockchain is longer than current blockchain");
      blockchain = replaceChain(receivedBlocks, blockchain, sockets, getGenesisBlock);
    }
  } else {
    console.log('received blockchain is not longer than current blockchain. Do nothing');
  }
  return blockchain;
};

export const updateBlock = (newBlockchain, blockchain) => {
  blockchain = newBlockchain;
  fsmanager.writeData(blockchain);
  return blockchain;
};

export const addBlock = (newBlock, blockchain) => {
  if (isValidNewBlock(newBlock, getLatestBlock(blockchain))) {
    blockchain.push(newBlock);
  }
  return blockchain
};

export const generateNextBlock = (blockData, blockchain, Block) => {
  const previousBlock = getLatestBlock(blockchain);
  const nextIndex = previousBlock.index + 1;
  const nextTimestamp = Date.now();
  const nextHash = crypto.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
  return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};
export const getGenesisEMRBlock = () => {
  return {
    "index": 0,
    "previousHash": `0`,
    "timestamp": 1606147699953,
    "hash": `816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7`,
    "data": `U2FsdGVkX18607VQsjsavdCNzQ+2p95kgqu2H+L49dk=`
  };
};

export default {
  MessageType,
  getLatestBlock,
  queryChainLengthMsg,
  queryAllMsg,
  responseChainMsg,
  responseLatestMsg,
  isValidNewBlock,
  replaceChain,
  handleBlockchainResponse,
  addBlock,
  updateBlock,
  generateNextBlock
};