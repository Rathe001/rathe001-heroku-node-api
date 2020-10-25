import * as bcrypt from 'bcrypt';
import * as WebSocket from 'websocket';
import * as http from 'http';
import onRequest from './events/onRequest';
import store from './constants/store';

const state = store.get();
const salt = bcrypt.genSaltSync(10);
state.utils.salt = salt;
store.set(state);

const WebSocketServer = WebSocket.server;
const server = http.createServer();
server.listen(process.env.PORT || 3001);
const wsServer = new WebSocketServer({
  httpServer: server,
});

wsServer.on('request', (request) => {
  onRequest({ request });
});
