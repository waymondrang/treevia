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

type Player = {
  id: string;
  name: string;
};

type Game = {
  players: Player[];
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
  var roomCode: string;

  socket.on("joinRoom", function (rc) {
    console.log("[" + socket.id + "] Joining Room: " + rc);
    if (games[rc] === undefined) {
      socket.emit("gameError", "Room does not exist.");
      return;
    }
    socket.join(rc);
    games[rc].players.push({ id: socket.id, name: "" });
    console.log(games[rc].players);
    io.to(rc).emit("gameState", games[rc].gameState);
    // send player list to host
    io.to(games[rc].host).emit("completeGameState", games[rc]);

    roomCode = rc;
  });

  socket.on("createRoom", function (rc) {
    console.log("[" + socket.id + "] Creating Room: " + rc);
    socket.join(rc);
    games[rc] = {
      players: [],
      gameState: 1,
      hostState: 1,
      host: socket.id,
    };
    io.to(rc).emit("gameState", games[rc].gameState);
    io.to(rc).emit("hostState", games[rc].hostState);

    roomCode = rc;
  });

  socket.on("startGame", function () {
    if (games[roomCode].host !== socket.id) {
      socket.emit("gameError", "You are not the host.");
      return;
    }

    if (!roomCode) {
      socket.emit("gameError", "You are not in a room.");
      return;
    }

    console.log("[" + socket.id + "] Starting Game: " + roomCode);
    games[roomCode].gameState = 2;
    games[roomCode].hostState = 2;
    io.to(roomCode).emit("gameState", games[roomCode].gameState);
    io.to(roomCode).emit("hostState", games[roomCode].hostState);
  });

  socket.on("disconnect", function () {
    console.log("Socket Disconnected");
    // remove player from game
    if (roomCode && games[roomCode]) {
      games[roomCode].players = games[roomCode].players.filter(
        (p) => p.id !== socket.id
      );
      // send player list to host
      io.to(games[roomCode].host).emit("completeGameState", games[roomCode]);

      // if host disconnects, delete game
      if (games[roomCode].host === socket.id) {
        console.log("[" + socket.id + "] Deleting Game: " + roomCode);
        io.to(roomCode).emit("gameError", "Host has disconnected.");
        io.to(roomCode).emit("gameState", 0);
        // remove room
        io.of("/")
          .in(roomCode)
          .fetchSockets()
          .then((sockets) => {
            sockets.forEach((socket) => {
              socket.leave(roomCode);
            });
          });
        delete games[roomCode];
      }
    }
  });
});

server.listen(PORT, function () {
  console.log(`http://localhost:${PORT}/`);
});
