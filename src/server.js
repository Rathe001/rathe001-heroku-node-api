import express from "express";
import http from "http";
import ws from "ws";

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const { name, input } = JSON.parse(data);
    switch (type) {
      case "connection":
        wss.clients.forEach((client) => {
          if (client !== ws) {
            client.send(`${name} has connected.`);
          } else {
            ws.send(`You have connected.`);
          }
        });
      case "message":
      default:
        wss.clients.forEach((client) => {
          if (client !== ws) {
            client.send(`${name} says, "${input}"`);
          } else {
            ws.send(`You say, "${input}"`);
          }
        });
    }
  });

  ws.send("Welcome to the server!");
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port}!`);
});
