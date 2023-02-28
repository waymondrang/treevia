import socketio from "socket.io";
import express from "express";
import http from "http";

const PORT = 3001;

const app = express();

const server = http.createServer(app);

const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
});

type Game = {
  players: string[];
  host: string;
  gameState: number;
  hostState: number;
};

var games = {} as {
  [key: string]: Game;
};

// not sure if this is necessary
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("build"));

io.on("connection", function (socket) {
  console.log("Socket Connection Established");
  socket.on("joinRoom", function (roomCode) {
    console.log("[" + socket.id + "] Joining Room: " + roomCode);
    if (games[roomCode] === undefined) {
      socket.emit("gameError", "Room does not exist.");
      return;
    }
    socket.join(roomCode);
    games[roomCode].players.push(socket.id);
    console.log(games[roomCode].players);
    io.to(roomCode).emit("gameState", games[roomCode].gameState);
  });

  socket.on("createRoom", function (roomCode) {
    console.log("[" + socket.id + "] Creating Room: " + roomCode);
    socket.join(roomCode);
    games[roomCode] = {
      players: [],
      gameState: 1,
      hostState: 1,
      host: socket.id,
    };
    io.to(roomCode).emit("gameState", games[roomCode].gameState);
    io.to(roomCode).emit("hostState", games[roomCode].hostState);
  });

  // TODO: do not delete room if last player is still in game and host is still alive
  socket.on("disconnect", function () {
    console.log("Socket Disconnected");
    // remove player from game
    for (var roomCode in games) {
      var index = games[roomCode].players.indexOf(socket.id);
      if (index > -1) {
        games[roomCode].players.splice(index, 1);
        if (games[roomCode].players.length === 0) {
          delete games[roomCode];
        }
        return;
      }
    }
  });
});

server.listen(PORT, function () {
  console.log(`http://localhost:${PORT}/`);
});
