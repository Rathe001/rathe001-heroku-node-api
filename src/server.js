import express from "express";
import http from "http";
import ws from "ws";

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", ({ name, msg }) => {
    wss.clients.forEach((client) => {
      client.send(`${name}: ${message}`);
    });
  });

  ws.send("Hi there, I am a WS server!");
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port}!`);
});
