import { checkdifference } from '../helpers'
import blockchainsLogic, { MessageType } from '../blockchain/logic'
const write = (ws, message) => ws.send(JSON.stringify(message));
const broadcast = (sockets, message) => sockets.forEach(ws => write(ws, message));
const initErrorHandler = (ws, sockets, updateSockets) => {
  const closeConnection = (ws) => {
    console.log('connection failed to peer: ' + ws.url);
    sockets.splice(sockets.indexOf(ws), 1);
  };
  ws.on('close', () => closeConnection(ws));
  ws.on('error', () => closeConnection(ws));
  updateSockets(sockets)
};

const initMessageHandler = (ws, blockchain, sockets, getGenesisBlock, updateBlockchain) => { //init
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    console.log('Received message' + JSON.stringify(message));
    switch (message.type) {
      case MessageType.QUERY_LATEST:
        write(ws, blockchainsLogic.responseLatestMsg(blockchain));
        break;
      case MessageType.QUERY_ALL:
        write(ws, blockchainsLogic.responseChainMsg(blockchain));
        break;
      case MessageType.RESPONSE_BLOCKCHAIN:
        console.log("===========MessageByteSize===========")
        console.log(Buffer.byteLength(data, 'utf8'), 'byte')
        console.log("=====================================")
        checkdifference(new Date(JSON.parse(message.data)[0].timestamp));
        updateBlockchain(blockchainsLogic.handleBlockchainResponse(message, blockchain, sockets, getGenesisBlock));
        break;
    }
  });
};
export {
  write,
  broadcast,
  initErrorHandler,
  initMessageHandler
}
