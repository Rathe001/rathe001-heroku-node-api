import WebSocket from 'websocket';
import http from 'http';

const WebSocketServer = WebSocket.server;
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(process.env.PORT || 3001);
const wsServer = new WebSocketServer({
  httpServer: server,
});

// I'm maintaining all active connections in this object
const clients = {};

wsServer.on('request', function (request) {
  const userID = '1';
  console.log(new Date() + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
});
