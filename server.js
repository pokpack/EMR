import express from 'express'
import bodyParser from 'body-parser'
import WebSocket from 'ws'
import models from './src/models'
import blockchainsLogic from './src/blockchain/logic'
import crypto from './src/helpers/crypto'
import { write, broadcast, initErrorHandler, initMessageHandler } from './src/socket_servers'

const { ParticipantBlock } = models
const http_port = process.env.HTTP_PORT || 3001;
const p2p_port = process.env.P2P_PORT || 6001;
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

let sockets = [];

const getGenesisParticipantBlock = () => {
  return {
    "index": 0,
    "previousHash": `0`,
    "timestamp": Date.now(),
    "hash": `816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7`,
    "data": `U2FsdGVkX19rnP7i0ysECsV/l7QeKI8oN7oXOyM4vN4=`
  };
};

let participantBlockchain = [getGenesisParticipantBlock()];

const initHttpServer = () => {
  const app = express();
  app.use(bodyParser.json());

  // Participants
  app.get('/participants', (req, res) => res.send(JSON.stringify(participantBlockchain)));
  app.get('/participants/:index', (req, res) => {
    const b = participantBlockchain[req.params.index]
    res.send(JSON.stringify(new ParticipantBlock(b['index'], b['previousHash'], b['timestamp'], b['data'], b['hash'])))
  });
  app.get('/participants/:index/data', (req, res) => {
    const b = participantBlockchain[req.params.index]
    res.send(new ParticipantBlock(b['index'], b['previousHash'], b['timestamp'], b['data'], b['hash']).getData())
  });
  app.post('/mineParticipant', (req, res) => {
    const newBlock = blockchainsLogic.generateNextBlock(crypto.encryption(req.body.data), participantBlockchain, ParticipantBlock);
    participantBlockchain = blockchainsLogic.addBlock(newBlock, participantBlockchain)
    broadcast(sockets, blockchainsLogic.responseLatestMsg(participantBlockchain));
    console.log('block added: ' + JSON.stringify(newBlock));
    res.send(JSON.stringify(newBlock));
  });
  // Peers
  app.get('/peers', (req, res) => {
    res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
  });
  app.post('/addPeer', (req, res) => {
    connectToPeers([req.body.peer]);
    res.send();
  });
  app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
};


const initP2PServer = () => { //init
  const server = new WebSocket.Server({ port: p2p_port });
  server.on('connection', ws => initConnection(ws));
  console.log('listening websocket p2p port on: ' + p2p_port);

};
const initConnection = (ws) => { //init
  sockets.push(ws);
  initMessageHandler(ws, participantBlockchain, sockets, getGenesisParticipantBlock, (b) => { participantBlockchain = b });
  initErrorHandler(ws, sockets, (s) => { sockets = s });
  write(ws, blockchainsLogic.queryChainLengthMsg());
};

const connectToPeers = (newPeers) => { //init
  newPeers.forEach((peer) => {
    const ws = new WebSocket(peer);
    ws.on('open', () => initConnection(ws));
    ws.on('error', () => {
      console.log('connection failed :' + peer)
    });
  });
};

connectToPeers(initialPeers);
initHttpServer();
initP2PServer();