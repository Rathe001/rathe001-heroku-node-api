const WebSocket = require('websocket');
const http = require('http');
const { uuid } = require('uuidv4');
import getStore from './core/store';
import playerActions from './core/players/actions';

const WebSocketServer = WebSocket.server;
const server = http.createServer();
server.listen(process.env.PORT || 3001);
const wsServer = new WebSocketServer({
  httpServer: server,
});

const store = getStore();
const state = store.getState();

const originIsAllowed = (origin) => {
  const allowed = ['http://www.astigmapro.com', 'http://localhost:3000'];

  return allowed.includes(origin);
};

wsServer.on('request', function (request) {
  const id = uuid();

  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(`Request from ${request.origin} rejected.`);
    return;
  }

  const connection = request.accept(null, request.origin);
  store.dispatch(playerActions.add({
    id,
    connection,
    position: {
      x: 40,
      y: 20,
    }
  }));
  console.log(`Player ${id} connected from ${request.origin}`);

  connection.on('message', (message) => {
    const rs = JSON.parse(message.utf8Data);
    rs.actions.forEach(action => store.dispatch(playerActions[action]({ id })));
  });

  connection.on('close', (reasonCode, description) => {
    console.log(`${connection.remoteAddress} disconnected.`);
    store.dispatch(playerActions.remove({ id }));
  });
});
