import express from 'express';
import http from 'http';
import ws from 'ws';

let messages = [];
const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const { name, input, type } = JSON.parse(data);
    messages.push('Welcome to the server!');

    switch (type) {
      case 'connection':
        wss.clients.forEach((client) => {
          if (client !== ws) {
            messages.push(`${name} has connected.`);
          } else {
            messages.push(`You have connected.`);
          }
        });
      case 'message':
      default:
        wss.clients.forEach((client) => {
          if (client !== ws) {
            messages.push(`${name} says, "${input}"`);
          } else {
            messages.push(`You say, "${input}"`);
          }
        });
    }
    ws.send(JSON.stringify(messages));
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port}!`);
});
