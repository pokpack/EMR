import express from 'express'
import bodyParser from 'body-parser'
import WebSocket from 'ws'
import models from './models'
import {
  STATE_ID,
  setState,
  dataAdmits,
  dataCures,
  dataDispenses,
  dataDiagnoses,
  dataAdmiteds,
  dataCureds,
  dataDispenseds,
  dataDiagnoseds,
  dataEMRId,
  dataHistory
} from './helpers/logiction'
import crypto from './helpers/crypto'
import fsmanager from './helpers/fsmanager'

import { queryChainLengthMsg, getGenesisEMRBlock, generateNextBlock, updateBlock, addBlock, responseLatestMsg } from './blockchain/logic'
import middleware, { updateToken } from './middleware'
import { write, broadcast, initErrorHandler, initMessageHandler } from './socket_servers'

const { EMRBlock } = models
const http_port = process.env.HTTP_PORT || 3001;
const p2p_port = process.env.P2P_PORT || 6001;
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];
let sockets = [];
let EMRBlockchain = fsmanager.readData([getGenesisEMRBlock()]);

const initHttpServer = () => {
  const app = express();
  app.use(bodyParser.json());

  app.post('/api/:hn/admit/:emrId', middleware, (req, res) => {
    const { body, params: { emrId, hn } } = req;
    const newBlock = generateNextBlock(crypto.encryption(setState(emrId, hn, STATE_ID.ADMIT, body)), EMRBlockchain, EMRBlock);
    updateBlock(addBlock(newBlock, EMRBlockchain), EMRBlockchain)
    broadcast(sockets, responseLatestMsg(EMRBlockchain));
    res.send(JSON.stringify(newBlock));
  });

  app.post('/api/:hn/cure/:emrId', middleware, (req, res) => {
    const { body, params: { emrId, hn } } = req;
    const newBlock = generateNextBlock(crypto.encryption(setState(emrId, hn, STATE_ID.CURE, body)), EMRBlockchain, EMRBlock);
    updateBlock(addBlock(newBlock, EMRBlockchain), EMRBlockchain)
    broadcast(sockets, responseLatestMsg(EMRBlockchain));
    res.send(JSON.stringify(newBlock));
  });

  app.post('/api/:hn/dispense/:emrId', middleware, (req, res) => {
    const { body, params: { emrId, hn } } = req;
    const newBlock = generateNextBlock(crypto.encryption(setState(emrId, hn, STATE_ID.DISPENSE, body)), EMRBlockchain, EMRBlock);
    updateBlock(addBlock(newBlock, EMRBlockchain), EMRBlockchain)
    broadcast(sockets, responseLatestMsg(EMRBlockchain));
    res.send(JSON.stringify(newBlock));
  });


  app.post('/api/:hn/diagnose/:emrId', middleware, (req, res) => {
    const { body, params: { emrId, hn } } = req;
    const newBlock = generateNextBlock(crypto.encryption(setState(emrId, hn, STATE_ID.DIAGNOSE, body)), EMRBlockchain, EMRBlock);
    updateBlock(addBlock(newBlock, EMRBlockchain), EMRBlockchain)
    broadcast(sockets, responseLatestMsg(EMRBlockchain));
    res.send(JSON.stringify(newBlock));
  });

  app.get('/api/admits', middleware, (req, res) => res.send(JSON.stringify(dataAdmits(EMRBlockchain))));
  app.get('/api/cures', middleware, (req, res) => res.send(JSON.stringify(dataCures(EMRBlockchain))));
  app.get('/api/dispenses', middleware, (req, res) => res.send(JSON.stringify(dataDispenses(EMRBlockchain))));
  app.get('/api/diagnoses', middleware, (req, res) => res.send(JSON.stringify(dataDiagnoses(EMRBlockchain))));

  app.get('/api/admiteds', middleware, (req, res) => res.send(JSON.stringify(dataAdmiteds(EMRBlockchain))));
  app.get('/api/cureds', middleware, (req, res) => res.send(JSON.stringify(dataCureds(EMRBlockchain))));
  app.get('/api/dispenseds', middleware, (req, res) => res.send(JSON.stringify(dataDispenseds(EMRBlockchain))));
  app.get('/api/diagnoseds', middleware, (req, res) => res.send(JSON.stringify(dataDiagnoseds(EMRBlockchain))));

  app.get('/api/:hn/emr/:emrId', middleware, (req, res) => res.send(JSON.stringify(dataEMRId(EMRBlockchain, req.params.hn, req.params.emrId))));
  app.get('/api/:hn/history', middleware, (req, res) => res.send(JSON.stringify(dataHistory(EMRBlockchain, req.params.hn))));


  app.get('/EMRs', middleware, (req, res) => res.send(JSON.stringify(EMRBlockchain)));
  app.get('/EMRs/:index', middleware, (req, res) => {
    const block = EMRBlockchain[req.params.index]
    res.send(JSON.stringify(new EMRBlock(block['index'], block['previousHash'], block['timestamp'], block['data'], block['hash'])))
  });
  app.post('/mineEMR', middleware, (req, res) => {
    const newBlock = generateNextBlock(crypto.encryption(req.body.data), EMRBlockchain, EMRBlock);
    updateBlock(addBlock(newBlock, EMRBlockchain), EMRBlockchain)
    broadcast(sockets, responseLatestMsg(EMRBlockchain));
    res.send(JSON.stringify(newBlock));
  });
  app.get('/EMRS/:index/data', (req, res) => {
    const block = EMRBlockchain[req.params.index]
    res.send(new EMRBlock(block['index'], block['previousHash'], block['timestamp'], block['data'], block['hash']).getData())
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
  initMessageHandler(
    ws,
    EMRBlockchain,
    sockets,
    getGenesisEMRBlock,
    b => { EMRBlockchain = updateBlock(b, EMRBlockchain) }
  );
  initErrorHandler(ws, sockets, (s) => { sockets = s });
  write(ws, queryChainLengthMsg());
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