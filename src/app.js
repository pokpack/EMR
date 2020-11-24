import express from 'express'
import bodyParser from 'body-parser'
import WebSocket from 'ws'
import models from './models'
import { setState, STATE_ID, dataAdmits, dataExaminations, dataDispenses, dataEMRId, dataHistory } from './helpers/logiction'
import crypto from './helpers/crypto'
import blockchainsLogic, { getGenesisEMRBlock } from './blockchain/logic'
import middleware, { updateToken } from './middleware'
import { write, broadcast, initErrorHandler, initMessageHandler } from './socket_servers'

const { EMRBlock } = models
const http_port = process.env.HTTP_PORT || 3001;
const p2p_port = process.env.P2P_PORT || 6001;
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];
let sockets = [];
let EMRBlockchain = [getGenesisEMRBlock()];

const initHttpServer = () => {
  const app = express();
  app.use(bodyParser.json());

  app.post('/api/:hn/admit/:emrId', middleware, (req, res) => {
    const newBlock = blockchainsLogic.generateNextBlock(crypto.encryption(setState(req.params.emrId, req.params.hn, STATE_ID.ADMIT, req.body.data)), EMRBlockchain, EMRBlock);
    EMRBlockchain = blockchainsLogic.addBlock(newBlock, EMRBlockchain)
    broadcast(sockets, blockchainsLogic.responseLatestMsg(EMRBlockchain));
    res.send(JSON.stringify(newBlock));
  });

  app.post('/api/:hn/examination/:emrId', middleware, (req, res) => {
    const newBlock = blockchainsLogic.generateNextBlock(crypto.encryption(setState(req.params.emrId, req.params.hn, STATE_ID.EXAMINATION, req.body.data)), EMRBlockchain, EMRBlock);
    EMRBlockchain = blockchainsLogic.addBlock(newBlock, EMRBlockchain)
    broadcast(sockets, blockchainsLogic.responseLatestMsg(EMRBlockchain));
    res.send(JSON.stringify(newBlock));
  });

  app.post('/api/:hn/dispense/:emrId', middleware, (req, res) => {
    const newBlock = blockchainsLogic.generateNextBlock(crypto.encryption(setState(req.params.emrId, req.params.hn, STATE_ID.DISPENSE, req.body.data)), EMRBlockchain, EMRBlock);
    EMRBlockchain = blockchainsLogic.addBlock(newBlock, EMRBlockchain)
    broadcast(sockets, blockchainsLogic.responseLatestMsg(EMRBlockchain));
    res.send(JSON.stringify(newBlock));
  });


  app.post('/api/:hn/treat/:emrId', middleware, (req, res) => {
    const newBlock = blockchainsLogic.generateNextBlock(crypto.encryption(setState(req.params.emrId, req.params.hn, STATE_ID.TREAT, req.body.data)), EMRBlockchain, EMRBlock);
    EMRBlockchain = blockchainsLogic.addBlock(newBlock, EMRBlockchain)
    broadcast(sockets, blockchainsLogic.responseLatestMsg(EMRBlockchain));
    console.log('block added: ' + JSON.stringify(newBlock));
    res.send(JSON.stringify(newBlock));
  });

  app.get('/api/admits', middleware, (req, res) => res.send(JSON.stringify(dataAdmits(EMRBlockchain))));
  app.get('/api/examinations', middleware, (req, res) => res.send(JSON.stringify(dataExaminations(EMRBlockchain))));
  app.get('/api/dispenses', middleware, (req, res) => res.send(JSON.stringify(dataDispenses(EMRBlockchain))));
  // app.get('/api/treats', middleware, (req, res) => res.send(JSON.stringify(EMRBlockchain)));

  app.get('/api/:hn/emr/:emrId', middleware, (req, res) => res.send(JSON.stringify(dataEMRId(EMRBlockchain, req.params.hn, req.params.emrId))));
  app.get('/api/:hn/history', middleware, (req, res) => res.send(JSON.stringify(dataHistory(EMRBlockchain, req.params.hn))));


  app.get('/EMRs', middleware, (req, res) => res.send(JSON.stringify(EMRBlockchain)));
  app.get('/EMRs/:index', middleware, (req, res) => {
    const b = EMRBlockchain[req.params.index]
    res.send(JSON.stringify(new EMRBlock(b['index'], b['previousHash'], b['timestamp'], b['data'], b['hash'])))
  });
  app.post('/mineEMR', middleware, (req, res) => {
    const newBlock = blockchainsLogic.generateNextBlock(crypto.encryption(req.body.data), EMRBlockchain, EMRBlock);
    EMRBlockchain = blockchainsLogic.addBlock(newBlock, EMRBlockchain)
    broadcast(sockets, blockchainsLogic.responseLatestMsg(EMRBlockchain));
    console.log('block added: ' + JSON.stringify(newBlock));
    res.send(JSON.stringify(newBlock));
  });
  app.get('/EMRS/:index/data', (req, res) => {
    const b = EMRBlockchain[req.params.index]
    res.send(new EMRBlock(b['index'], b['previousHash'], b['timestamp'], b['data'], b['hash']).getData())
  });
  app.get('/peers', middleware, (req, res) => {
    res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
  });

  app.post('/addPeer', middleware, (req, res) => {
    connectToPeers([req.body.peer]);
    res.send();
  });
  app.post('/newToken', middleware, (req, res) => {
    if (req.body.token) {
      updateToken(req.body.token);
      res.send(`Successful`);
    } else {
      res.send('Unsuccessful')
    }
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
      console.log('connection failed :' + peer)
    });
  });
};

connectToPeers(initialPeers);
initHttpServer();
initP2PServer();