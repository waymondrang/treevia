import socketio from "socket.io";
import express from "express";
import http from "http";
import ClientStates from "./src/util/ClientStates";

// Add comments!!!!@!!!!!!!! -adhi no -ray

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
  score: number;
};

type Answer = {
  answer: string;
  color: string;
  correct: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
  playerAnswers: {
    [key: string]: string;
  };
};

type BroadcastedQuestion = {
  question: string;
  answers: Answer[];
};

type Game = {
  players: Player[];
  host: string;
  gameState: typeof ClientStates[keyof typeof ClientStates];
  hostState: number;
  currentQuestion?: Question;
};

var games = {} as {
  [key: string]: Game;
};

type GameResults = {
  answers: Answer[];
  correct: boolean;
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
    games[rc].players.push({ id: socket.id, name: "", score: 0 });
    console.log(games[rc].players);
    io.to(rc).emit("gameState", games[rc].gameState);
    // send player list to host
    io.to(games[rc].host).emit("completeGameState", games[rc]);

    roomCode = rc;
  });

  socket.on("createRoom", function (rc) {
    // check if room already exists
    if (games[rc] !== undefined) {
      socket.emit("gameError", "Room already exists.");
      return;
    }
    console.log("[" + socket.id + "] Creating Room: " + rc);

    socket.join(rc);
    games[rc] = {
      players: [],
      gameState: "postJoinWaitingGameState",
      hostState: 1,
      host: socket.id,
    };
    io.to(rc).emit("gameState", games[rc].gameState);
    io.to(rc).emit("hostState", games[rc].hostState);

    roomCode = rc;
  });

  socket.on("startGame", function () {
    if (!roomCode) {
      socket.emit("gameError", "You are not in a room.");
      return;
    }

    if (games[roomCode] === undefined) {
      socket.emit("gameError", "Room does not exist.");
      return;
    }

    if (games[roomCode].host !== socket.id) {
      socket.emit("gameError", "You are not the host.");
      return;
    }

    console.log("[" + socket.id + "] Starting Game: " + roomCode);
    games[roomCode].gameState = "readyGameState";
    games[roomCode].hostState = 2;
    io.to(roomCode).emit("gameState", games[roomCode].gameState);
    io.to(roomCode).emit("hostState", games[roomCode].hostState);
  });

  socket.on("broadcastQuestion", function (question: BroadcastedQuestion) {
    try {
      if (games[roomCode].host !== socket.id) {
        socket.emit("gameError", "You are not the host.");
        return;
      }

      games[roomCode].currentQuestion = {
        question: question.question,
        answers: question.answers,
        playerAnswers: {},
      };

      io.to(roomCode).emit(
        "broadcastAnswers",
        question.answers.map((a) => {
          return { answer: a.answer, color: a.color };
        })
      );
    } catch (e) {
      console.log(e);
      socket.emit("gameError", "Something went wrong.");
    }
  });

  /**
   * Broadcasts the results of the current question to all players.
   */
  socket.on("broadcastResults", function () {
    if (games[roomCode].host !== socket.id) {
      socket.emit("gameError", "You are not the host.");
      return;
    }

    if (!games[roomCode].currentQuestion) {
      socket.emit("gameError", "No question is currently being asked.");
      return;
    }

    // process scores for each player
    games[roomCode].players.forEach((p) => {
      const answer = games[roomCode].currentQuestion!.playerAnswers[p.id];
      if (answer) {
        const correctAnswer = games[roomCode].currentQuestion!.answers.find(
          (a) => a.correct && a.answer === answer
        );
        if (correctAnswer) p.score += 1;

        // send results to individual player
        io.to(p.id).emit("questionResults", {
          question: games[roomCode].currentQuestion!,
          correct: correctAnswer,
        });
      }
    });

    games[roomCode].currentQuestion = undefined;

    // console log scores
    console.log("Player Data", games[roomCode].players);
  });

  socket.on("submitAnswer", function (answer) {
    try {
      console.log("[" + socket.id + "] Submitting Answer: " + answer);
      games[roomCode].currentQuestion!.playerAnswers[socket.id] = answer;
      io.to(roomCode).emit("completeGameState", games[roomCode]);
    } catch (e) {
      console.log(e);
      socket.emit("gameError", "No question is currently being asked.");
    }
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
