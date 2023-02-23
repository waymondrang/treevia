const PORT = 8080;

const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new socketio.Server(server);

app.use(express.static("build"));

io.on("connection", function (socket) {
  console.log("Socket Connection Established");
});

server.listen(PORT, function () {
  console.log(`http://localhost:${PORT}/`);
});
