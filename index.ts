import socketio from "socket.io";
import express from "express";
import http from "http";
import ClientStates from "./src/util/ClientStates";
import HostStates from "./src/util/HostStates";

const adjectives = require("./adjectives.json") as string[];
const nouns = require("./nouns.json") as string[];
const emojis = require("./emojis.json") as string[];

// Add comments!!!!@!!!!!!!! -adhi no -ray

const PORT = 3001;

const app = express();

const server = http.createServer(app);

const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
});

type SocketID = string;

type Player = {
  id: SocketID;
  name: string;
  score: number;
};

type Team = {
  name: string;
  score: number;
  players: Player[];
};

type Answer = {
  answer: string;
  color: string;
  correct: boolean;
};

type TeamAnswer = {
  team: string;
  answer: string;
  player: Player;
};

type QuestionData = {
  question: string;
  answers: Answer[];
  explanation: string;
};

type Question = {
  question: QuestionData;
  teamAnswers: {
    [key: string]: TeamAnswer;
  };
};

type BroadcastedQuestion = {
  question: string;
  answers: Answer[];
};

type Game = {
  roomCode: string;
  teams: Team[];
  host: SocketID;
  gameState: string;
  hostState: string;
  currentQuestion?: Question;
};

// main game object
var games = {
  "0": {
    roomCode: "0",
    teams: [],
    gameState: ClientStates.joinGameState,
    hostState: HostStates.createGameHostState,
    host: "0",
  },
} as {
  [key: string]: Game;
};

type GameResults = {
  answers: Answer[];
  correct: boolean;
};

type JoinGamePayload = {
  roomCode: string;
  username: string;
  teamName: string;
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

function createNDigitRoomCode(n: number): string {
  return Array(n)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");
}

function createRandomAdjectiveNoun(): string {
  let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  return (
    adjective.charAt(0).toUpperCase() +
    adjective.slice(1) +
    noun.charAt(0).toUpperCase() +
    noun.slice(1)
  );
}

function createRandomNLengthEmojiString(n: number): string {
  return Array(n)
    .fill(0)
    .map(() => emojis[Math.floor(Math.random() * emojis.length)])
    .join("");
}

io.on("connection", function (socket) {
  console.log("Socket Connection Established");
  var roomCode: string;
  var username: string;
  var teamName: string;
  var player: Player;

  socket.on("joinRoom", function (payload: JoinGamePayload) {
    let { roomCode: rc, username: u, teamName: tn } = payload;

    if (games[rc] === undefined) {
      socket.emit("gameError", "Room does not exist.");
      socket.emit("gameState", ClientStates.joinGameState);
      return;
    }

    // check if room is closed
    if (games[rc].hostState !== HostStates.lobbyHostState) {
      socket.emit("gameError", "This game has already started.");
      socket.emit("gameState", ClientStates.joinGameState);
      return;
    }

    // check if username is taken
    if (games[rc].teams.some((t) => t.players.some((p) => p.name === u))) {
      socket.emit("gameError", "Username is taken.");
      return;
    }

    socket.join(rc);

    if (!u) {
      // generate random username
      u = createRandomAdjectiveNoun();

      // TODO: this is unsafe if all usernames are taken
      while (games[rc].teams.some((t) => t.players.some((p) => p.name === u))) {
        u = createRandomAdjectiveNoun();
      }
    }

    if (!tn) {
      // generate random team name
      tn = createRandomNLengthEmojiString(3);
      console.log(tn);

      // TODO: this is unsafe if all team names are taken
      while (games[rc].teams.some((t) => t.name === tn)) {
        tn = createRandomNLengthEmojiString(3);
      }
    }

    // create player object
    const p: Player = {
      id: socket.id,
      name: u,
      score: 0,
    };

    // check if team exists
    let team = games[rc].teams.find((t) => t.name === tn);
    if (team === undefined) {
      team = {
        name: tn,
        score: 0,
        players: [p],
      } as Team;
      games[rc].teams.push(team);
    } else {
      team.players.push(p);
    }

    // send player list to host
    io.to(games[rc].host).emit("completeGameState", games[rc]);
    socket.emit("confirmPlayerData", { username: u, teamName: tn });
    socket.emit("gameState", games[rc].gameState);

    roomCode = rc;
    username = u;
    teamName = tn;
    player = p;
  });

  socket.on("checkRoom", function (rc) {
    if (games[rc] === undefined) {
      socket.emit("gameError", "Room does not exist.");
      socket.emit("gameState", ClientStates.joinGameState);
      return;
    }

    if (games[rc].hostState !== HostStates.lobbyHostState) {
      socket.emit("gameError", "This game has already started.");
      socket.emit("gameState", ClientStates.joinGameState);
      return;
    }

    socket.emit("gameState", ClientStates.enterUsernameTeamGameState);
  });

  socket.on("createRoom", function () {
    // 6 digit random room code
    let rc = createNDigitRoomCode(6);
    while (games[rc] !== undefined) {
      rc = createNDigitRoomCode(6);
    }
    console.log("[" + socket.id + "] Creating Room: " + rc);

    socket.join(rc);
    games[rc] = {
      roomCode: rc,
      teams: [],
      gameState: ClientStates.postJoinWaitingGameState,
      hostState: HostStates.lobbyHostState,
      host: socket.id,
    };

    // is this emitting to any clients?
    // io.to(rc).emit("gameState", games[rc].gameState);

    io.to(games[rc].host).emit("completeGameState", games[rc]);
    socket.emit("hostState", games[rc].hostState);

    roomCode = rc;
  });

  socket.on("startGame", function () {
    if (!roomCode) {
      socket.emit("gameError", "You are not in a room.");
      return;
    }

    if (games[roomCode] === undefined) {
      socket.emit("gameError", "Room does not exist.");
      socket.emit("gameState", ClientStates.joinGameState);
      return;
    }

    if (games[roomCode].host !== socket.id) {
      socket.emit("gameError", "You are not the host.");
      return;
    }

    // do not start game if there are no players (teams)
    if (games[roomCode].teams.length === 0) {
      socket.emit("gameError", "There are no players in the game.");
      return;
    }

    console.log("[" + socket.id + "] Starting Game: " + roomCode);
    games[roomCode].gameState = ClientStates.readyGameState;
    games[roomCode].hostState = HostStates.getReadyHostState;
    io.to(roomCode).emit("gameState", games[roomCode].gameState);
    io.to(games[roomCode].host).emit("hostState", games[roomCode].hostState);
  });

  socket.on("broadcastQuestion", function (question: QuestionData) {
    try {
      if (games[roomCode].host !== socket.id) {
        socket.emit("gameError", "You are not the host.");
        return;
      }

      games[roomCode].currentQuestion = {
        question: question,
        teamAnswers: {},
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
  socket.on("requestResults", function () {
    if (games[roomCode].host !== socket.id) {
      socket.emit("gameError", "You are not the host.");
      return;
    }

    if (!games[roomCode].currentQuestion) {
      socket.emit("gameError", "No question is currently being asked.");
      return;
    }

    // process scores for each team
    games[roomCode].teams.forEach((p) => {
      let teamAnswer: TeamAnswer =
        games[roomCode].currentQuestion!.teamAnswers[p.name];
      if (teamAnswer) {
        let correctAnswer = games[
          roomCode
        ].currentQuestion!.question.answers.some(
          (a) => a.correct && a.answer === teamAnswer.answer
        );
        if (correctAnswer) {
          // increase team score
          p.score += 1;
          // increase player score
          p.players.forEach((player) => {
            if (player.id === teamAnswer.player.id) {
              player.score += 1;
            }
          });
        }

        // send results to each player on the team
        p.players.forEach((player) => {
          io.to(player.id).emit("questionResults", {
            question: games[roomCode].currentQuestion!.question,
            correct: correctAnswer,
          });
        });
      }
    });

    games[roomCode].currentQuestion = undefined;

    // console log scores
    console.log("Player Data", games[roomCode].teams);

    // send update
    io.to(games[roomCode].host).emit("completeGameState", games[roomCode]);
    io.to(roomCode).emit("hostState", HostStates.resultsHostState);
  });

  socket.on("submitAnswer", function (answer) {
    try {
      console.log("[" + socket.id + "] Submitting Answer: " + answer);
      // check if question is being asked
      if (!games[roomCode].currentQuestion) {
        socket.emit("gameError", "No question is currently being asked.");
        return;
      }

      // check if team already answered
      if (games[roomCode].currentQuestion!.teamAnswers[teamName]) {
        socket.emit("gameError", "You have already answered.");
        return;
      }

      // set team answer
      games[roomCode].currentQuestion!.teamAnswers[teamName] = {
        team: teamName,
        answer: answer,
        player: player,
      } as TeamAnswer;
      io.to(roomCode).emit("completeGameState", games[roomCode]);

      // notify team members of gameState change
      games[roomCode].teams.forEach((t) => {
        if (t.name === teamName) {
          t.players
            .filter((p) => p.id !== socket.id)
            .forEach((p) => {
              io.to(p.id).emit(
                "gameState",
                ClientStates.postTeamAnswerWaitingGameState
              );
            });
        }
      });
    } catch (e) {
      console.log(e);
      socket.emit("gameError", "No question is currently being asked.");
    }
  });

  socket.on("disconnect", function () {
    console.log("Socket Disconnected");
    // remove player from game
    if (roomCode && games[roomCode]) {
      // remove player from team (perhaps inefficient?)
      games[roomCode].teams.forEach((t) => {
        t.players = t.players.filter((p) => p.id !== socket.id);
      });

      // remove empty teams
      games[roomCode].teams = games[roomCode].teams.filter(
        (t) => t.players.length > 0
      );

      // if host disconnects, delete game
      if (games[roomCode].host === socket.id) {
        console.log("[" + socket.id + "] Deleting Game: " + roomCode);
        io.to(roomCode).emit("gameError", "Host has disconnected.");
        io.to(roomCode).emit("gameState", ClientStates.joinGameState);
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
      } else {
        // send player list to host
        io.to(games[roomCode].host).emit("completeGameState", games[roomCode]);
      }
    }
  });
});

server.listen(PORT, function () {
  console.log(`http://localhost:${PORT}/`);
});
