import "./Host.css";
import { useEffect, useRef, useState } from "react";
import nobody from "../img/nobody.png";
import questionsRaw from "../questions.json";

export default function Host({ _io }) {
  var [socketStatus, setSocketStatus] = useState(_io.connected);
  var [roomCode, setRoomCode] = useState("");
  var [localHostState, setLocalHostState] = useState(0);
  var [remoteHostState, setRemoteHostState] = useState(0);
  var [completeGameState, setCompleteGameState] = useState({});
  var [playerList, setPlayerList] = useState([]);
  const [gameCycle, setGameCycle] = useState(0);
  const [gameError, setGameError] = useState("");
  var [currentQuestion, setCurrentQuestion] = useState({});

  var questions = questionsRaw;

  useEffect(() => {
    _io.connect();

    _io.on("connect", () => {
      console.log("Connected to Server");
      setSocketStatus(_io.connected);
    });

    _io.on("hostState", (state) => {
      console.log("_io Listener Host State Update", state);
      if (state === 2) startGameCycle();
      // may not need to handle different local and remote host states
      setRemoteHostState(state);
    });

    _io.on("completeGameState", (gameState) => {
      console.log("Game State Update", gameState);
      setCompleteGameState(gameState);
      setPlayerList(gameState.players);
    });

    _io.on("disconnect", () => {
      console.log("Disconnected from Server");
      setSocketStatus(_io.connected);
    });

    return () => {
      // disconnect from server
      _io.disconnect();
      // remove event listeners
      _io.off("connect");
      _io.off("hostState");
    };
  }, []);

  useEffect(() => {
    if (gameCycle === 2 && completeGameState.currentQuestion) {
      // check if all players have answered
      if (
        Object.keys(completeGameState.currentQuestion.playerAnswers).length ===
        completeGameState.players.length
      ) {
        console.log("All players have answered");
        // broadcast answers
        _io.emit("broadcastResults");
        // set game state
        setGameCycle(3);
      }
    }
  }, [completeGameState, gameCycle, _io]);

  function waitForTimeout(seconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }

  function assignColorsToQuestion(question) {
    let colors = ["red", "blue", "green", "yellow"];
    let colorIndex = 0;

    for (let i = 0; i < question.answers.length; i++) {
      question.answers[i].color = colors[colorIndex];
      colorIndex++;
    }

    return question;
  }

  async function startGameCycle() {
    console.log("Starting Game Cycle...");
    // start game cycle
    setGameCycle(1);
    // wait for 3 seconds
    await waitForTimeout(1);
    // start game
    nextQuestion();
  }

  function nextQuestion() {
    // choose question and update question set
    let question = questions[Math.floor(Math.random() * questions.length)];
    question = assignColorsToQuestion(question);

    console.log("Question", question);

    setCurrentQuestion(question);
    let newCompleteGameState = { ...completeGameState };
    newCompleteGameState.currentQuestion = undefined;

    setCompleteGameState(newCompleteGameState);

    questions = questions.filter((q) => q !== question);
    // start game
    setGameCycle(2);

    // broadcast question
    _io.emit("broadcastQuestion", question);
  }

  function createRoom(e) {
    e.preventDefault();

    if (!_io.connected) {
      console.log("No connection to server");
      setGameError("No connection to server.");
      return;
    }

    console.log("Creating Room...");
    // join room
    _io.emit("createRoom", roomCode);

    // set local host state
    setLocalHostState(1);
  }

  function startGame() {
    console.log("Starting Game...");
    // start game
    _io.emit("startGame");
    // set local host state
    setLocalHostState(2);
  }

  return (
    <div id="play">
      <span id="debug">{socketStatus ? "Connected" : "Disconnected"}</span>
      {localHostState === 0 && (
        <div>
          <form id="host">
            <h1>Host Game</h1>
            <input
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
              type="text"
              placeholder="Room Code"
            />
            <button onClick={createRoom} type="submit">
              Create
            </button>
          </form>
          {gameError && (
            <div id="error">
              <span>Oops! {gameError}</span>
            </div>
          )}
        </div>
      )}
      {localHostState === 1 && (
        <div id="lobby">
          <div id="control-panel">
            <div id="room-code">
              <h1>{roomCode}</h1>
            </div>
            <button onClick={startGame}>Start Game</button>
          </div>
          <div id="player-list">
            <h2>Players</h2>
            {playerList.length ? (
              <ul>
                {playerList.map((player) => (
                  <li key={player.id}>{player.id}</li>
                ))}
              </ul>
            ) : (
              <div id="empty-player-list">
                <img src={nobody} alt="" />
              </div>
            )}
          </div>
        </div>
      )}
      {/* gameCycle does not have 0 state */}
      {gameCycle === 1 && (
        <div id="ready">
          <h1>Get Ready!</h1>
        </div>
      )}
      {gameCycle === 2 && (
        <div id="host-question">
          <span className="question-text">{currentQuestion.question}</span>
          <div id="answers">
            {currentQuestion.answers.map((answer) => (
              <div
                className={"answer" + (answer.color ? " " + answer.color : "")}
                key={answer.answer}
              >
                <span>{answer.answer}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {gameCycle === 3 && (
        <div id="control-panel">
          <h1>Results</h1>
          <button onClick={nextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
}
