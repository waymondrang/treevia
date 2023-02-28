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

var games = {} as {
  [key: string]: {
    players: string[];
    state: number;
  };
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
    socket.join(roomCode);
    if (games[roomCode] === undefined) {
      games[roomCode] = {
        players: [],
        state: 1,
      };
    }
    games[roomCode].players.push(socket.id);
    console.log(games[roomCode].players);
    io.to(roomCode).emit("gameState", games[roomCode].state);
  });

  socket.on("disconnect", function () {
    console.log("Socket Disconnected");
    // remove player from game
    for (var roomCode in games) {
      var index = games[roomCode].players.indexOf(socket.id);
      if (index > -1) {
        games[roomCode].players.splice(index, 1);
      }
    }
  });
});

server.listen(PORT, function () {
  console.log(`http://localhost:${PORT}/`);
});
