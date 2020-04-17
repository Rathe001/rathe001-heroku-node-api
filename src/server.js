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

    switch (type) {
      case 'connection':
        messages.push({ name, input, type, id: messages.length + 1 });
      case 'message':
      default:
        messages.push({ name, input, type, id: messages.length + 1 });
    }
    ws.send(JSON.stringify(messages));
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port}!`);
});
