import "./Play.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

export default function Play({ _io }) {
  var [socketStatus, setSocketStatus] = useState(_io.connected);
  var [roomCode, setRoomCode] = useState("");
  var [gameState, setGameState] = useState(0);
  var [gameError, setGameError] = useState("");
  var [questionAnswers, setQuestionAnswers] = useState([]);
  var [questionResults, setQuestionResults] = useState([]);

  useEffect(() => {
    _io.connect();

    _io.on("connect", () => {
      console.log("Connected to Server");
      setSocketStatus(_io.connected);
    });

    _io.on("gameState", (state) => {
      if (state !== 0) setGameError("");
      setGameState(state);
    });

    _io.on("gameError", (error) => {
      console.log("Game Error", error);
      setGameError(error);
    });

    _io.on("broadcastAnswers", (answers) => {
      console.log("Answers", answers);
      setQuestionAnswers(answers);
      setGameState(3);
    });

    _io.on("questionResults", (results) => {
      console.log("Results", results);
      setQuestionResults(results);
      setGameState(5);
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
      _io.off("gameState");
      _io.off("gameError");
    };
  }, []);

  function joinRoom(e) {
    e.preventDefault();

    if (!_io.connected) {
      console.log("No Connection to Server");
      setGameError("No Connection to Server.");
      return;
    }

    console.log("Joining Room...");
    _io.emit("joinRoom", roomCode);
  }

  return (
    <div id="play">
      <span id="debug">{socketStatus ? "Connected" : "Disconnected"}</span>
      {gameState === 0 && (
        <form id="join">
          <h1>Join Game</h1>
          <input
            onChange={(e) => setRoomCode(e.target.value)}
            value={roomCode}
            type="text"
            placeholder="Room Code"
          />
          <button onClick={joinRoom} type="submit">
            Join
          </button>
        </form>
      )}
      {gameState === 1 && (
        <div id="waiting">
          <h1>Waiting for Game to Start</h1>
        </div>
      )}
      {gameState === 2 && (
        <div id="game">
          <h1>Get Ready!</h1>
        </div>
      )}
      {gameState === 3 && (
        <div id="client-question">
          <div id="answers">
            {questionAnswers.map((answer) => (
              <button
                className={"answer" + (answer.color ? " " + answer.color : "")}
                key={answer.answer}
                onClick={() => {
                  console.log("Answering: " + answer.answer);
                  _io.emit("submitAnswer", answer.answer);
                  // TODO: confirm receipt of answer
                  setGameState(4);
                }}
              >
                <span>{answer.answer}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {gameState === 4 && (
        <div id="waiting">
          <h1>Smart or lucky?</h1>
        </div>
      )}

      {gameState === 5 && (
        <div id="results">
          <h1>Results</h1>
          <div id="answers">
            You answered {questionResults.correct ? "correctly" : "incorrectly"}
            .
          </div>
        </div>
      )}

      {gameError && (
        <div id="error">
          <span>Oops! {gameError}</span>
        </div>
      )}
    </div>
  );
}
