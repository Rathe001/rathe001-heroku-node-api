const WebSocket = require('websocket');
const http = require('http');
const { uuid } = require('uuidv4');

const WebSocketServer = WebSocket.server;
const server = http.createServer();
server.listen(process.env.PORT || 3001);
const wsServer = new WebSocketServer({
  httpServer: server,
});
const clients = {};

const originIsAllowed = (origin) => {
  const allowed = ['http://www.astigmapro.com', 'http://localhost:3000'];

  return allowed.includes(origin);
};

wsServer.on('request', function (request) {
  const userID = uuid();

  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(`Request from ${request.origin} rejected.`);
    return;
  }

  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(`User ${userID} connected from ${request.origin}`);

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      connection.sendUTF(message.utf8Data);
    } else if (message.type === 'binary') {
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on('close', (reasonCode, description) => {
    console.log(`${connection.remoteAddress} disconnected.`);
  });
});
