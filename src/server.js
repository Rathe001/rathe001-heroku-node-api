import express from 'express';
import http from 'http';
import ws from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const { name, input, type } = JSON.parse(data);
    switch (type) {
      case 'connection':
        wss.clients.forEach((client) => {
          if (client !== ws) {
            name && client.send(`${name} has connected.`);
          } else {
            name && ws.send(`You have connected.`);
          }
        });
      case 'message':
      default:
        wss.clients.forEach((client) => {
          if (client !== ws) {
            input && client.send(`${name} says, "${input}"`);
          } else {
            input && ws.send(`You say, "${input}"`);
          }
        });
    }
  });

  ws.send('Welcome to the server!');
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port}!`);
});
