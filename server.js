import express from 'express'
import bodyParser from 'body-parser'
import WebSocket from 'ws'
import models from './src/models'
import blockchainsLogic from './src/blockchain/logic'
import crypto from './src/helpers/crypto'
import { write, broadcast, initErrorHandler, initMessageHandler } from './src/socket_servers'

const { EMRBlock } = models
const http_port = process.env.HTTP_PORT || 3001;
const p2p_port = process.env.P2P_PORT || 6001;
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const SECRET_KEY = process.env.SECRET_KEY || 'ful6fq';
let sockets = [];

const getGenesisEMRBlock = () => {
  return {
    "index": 0,
    "previousHash": `0`,
    "timestamp": 1465154705,
    "hash": `816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7`,
    "data": `U2FsdGVkX19rnP7i0ysECsV/l7QeKI8oN7oXOyM4vN4=`
  };
};

let EMRBlockchain = [getGenesisEMRBlock()];

const middleware = (req, res, next) => {
  if (req.headers.authorization === SECRET_KEY)
    next();
  else
    res.send("Impervious")
};

const initHttpServer = () => {
  const app = express();
  app.use(bodyParser.json());

  app.get('/EMRs', middleware, (req, res) => res.send(JSON.stringify(EMRBlockchain)));
  app.get('/EMRs/:index', middleware, (req, res) => {
    const b = EMRBlockchain[req.params.index]
    res.send(JSON.stringify(new EMRBlock(b['index'], b['previousHash'], b['timestamp'], b['data'], b['hash'])))
  });
  // app.get('/participants/:index/data', (req, res) => {
  //   const b = EMRBlockchain[req.params.index]
  //   res.send(new EMRBlock(b['index'], b['previousHash'], b['timestamp'], b['data'], b['hash']).getData())
  // });
  app.post('/mineEMR', middleware, (req, res) => {
    const newBlock = blockchainsLogic.generateNextBlock(req.body.data, EMRBlockchain, EMRBlock);
    EMRBlockchain = blockchainsLogic.addBlock(newBlock, EMRBlockchain)
    broadcast(sockets, blockchainsLogic.responseLatestMsg(EMRBlockchain));
    console.log('block added: ' + JSON.stringify(newBlock));
    res.send(JSON.stringify(newBlock));
  });
  app.get('/peers', middleware, (req, res) => {
    res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
  });
  app.post('/addPeer', middleware, (req, res) => {
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
  initMessageHandler(ws, EMRBlockchain, sockets, getGenesisEMRBlock, (b) => { EMRBlockchain = b });
  initErrorHandler(ws, sockets, (s) => { sockets = s });
  write(ws, blockchainsLogic.queryChainLengthMsg());
};

const connectToPeers = (newPeers) => { //init
  newPeers.forEach((peer) => {
    const ws = new WebSocket(peer);
    ws.on('open', () => initConnection(ws));
    ws.on('error', () => {
      console.log('connection failed')
    });
  });
};

connectToPeers(initialPeers);
initHttpServer();
initP2PServer();