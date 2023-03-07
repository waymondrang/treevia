import "./Play.css";
import { useEffect, useState } from "react";
import clientStates from "../util/ClientStates";

export default function Play({ _io }) {
  const [socketStatus, setSocketStatus] = useState(_io.connected);
  const [roomCode, setRoomCode] = useState("");
  const [clientState, setClientState] = useState(clientStates.joinGameState);
  const [gameError, setGameError] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [questionResults, setQuestionResults] = useState([]);
  const [username, setUsername] = useState("");
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    _io.connect();

    _io.on("connect", () => {
      console.log("Connected to Server");
      setSocketStatus(_io.connected);

      if (window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const roomCode = params.get("roomCode");
        if (roomCode) setRoomCode(roomCode);
        _io.emit("checkRoom", roomCode);
      }
    });

    _io.on("gameState", (state) => {
      if (state !== clientStates.joinGameState) setGameError("");
      setClientState(state);
    });

    _io.on("confirmPlayerData", (data) => {
      console.log("Confirm Player Data", data);
      setUsername(data.username);
      setTeamName(data.teamName);
    });

    _io.on("gameError", (error) => {
      console.log("Game Error", error);
      setGameError(error);
    });

    _io.on("broadcastAnswers", (answers) => {
      console.log("Answers", answers);
      setQuestionAnswers(answers);
      setClientState(clientStates.answerGameState);
    });

    _io.on("questionResults", (results) => {
      console.log("Results", results);
      setQuestionResults(results);
      setClientState(clientStates.postAnswerResultsGameState);
    });

    _io.on("disconnect", () => {
      console.log("Disconnected from Server");
      setSocketStatus(_io.connected);
      setGameError("Disconnected from Server");
      setClientState(clientStates.joinGameState);
      // reset game state
      setQuestionAnswers([]);
      setQuestionResults([]);
    });

    return () => {
      // disconnect from server
      _io.disconnect();
      // remove event listeners
      _io.off("connect");
      _io.off("gameState");
      _io.off("confirmPlayerData");
      _io.off("gameError");
      _io.off("broadcastAnswers");
      _io.off("questionResults");
      _io.off("disconnect");
    };
  }, []);

  useEffect(() => {
    if (clientState === clientStates.enterUsernameTeamGameState) {
      if (window.location.search) {
        const params = new URLSearchParams(window.location.search);
        if (params.get("roomCode") !== undefined && roomCode) {
          params.set("roomCode", roomCode);
          window.history.replaceState(null, null, "?" + params.toString());
        }
      }
    }
  }, [clientState, roomCode]);

  function joinRoom(e) {
    try {
      e.preventDefault();
    } catch (error) {
      console.log("No Event");
    }

    if (!_io.connected) {
      console.log("No Connection to Server");
      setGameError("No Connection to Server.");
      return;
    }

    console.log("Checking Room Before Joining...");
    _io.emit("checkRoom", roomCode);
  }

  return (
    <div id="play">
      <span id="debug">{socketStatus ? "Connected" : "Disconnected"}</span>
      {clientState === clientStates.joinGameState && (
        <form id="join">
          <h1>Join Game</h1>
          <input
            onChange={(e) => setRoomCode(e.target.value)}
            value={roomCode}
            type="number"
            placeholder="Room Code"
          />
          <button onClick={joinRoom} type="submit">
            Join
          </button>
        </form>
      )}

      {clientState === clientStates.enterUsernameTeamGameState && (
        <form id="username-team">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            maxLength="20"
            value={username}
          />
          <input
            type="text"
            placeholder="Team Name"
            maxLength="16"
            onChange={(e) => setTeamName(e.target.value)}
            value={teamName}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              _io.emit("joinRoom", {
                username: username,
                teamName: teamName,
                roomCode: roomCode,
              });
            }}
          >
            Submit
          </button>
          <p className="small-text">
            Leave a field blank for a random username or team name!
          </p>
        </form>
      )}

      {/* Add input for username and team creation */}
      {clientState === clientStates.postJoinWaitingGameState && (
        <div id="waiting">
          <h1>Waiting for Game to Start</h1>
          <div id="info">
            You are connected as <span id="username">{username}</span> on team{" "}
            <span id="team-name">{teamName}</span>
          </div>
        </div>
      )}

      {clientState === clientStates.readyGameState && (
        <div id="game">
          <h1>Get Ready!</h1>
        </div>
      )}

      {clientState === clientStates.answerGameState && (
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
                  setClientState(clientStates.postAnswerWaitingGameState);
                }}
              >
                <span>{answer.answer}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {clientState === clientStates.postAnswerWaitingGameState && (
        <div id="waiting">
          <h1>Smart or lucky?</h1>
          <div id="info">You've submitted the answer for your team!</div>
        </div>
      )}

      {clientState === clientStates.postTeamAnswerWaitingGameState && (
        <div id="waiting">
          {/* random string from array */}
          <h1>
            {
              ["Guesswork or genius?", "Whodunnit?", "Who's the smartest?"][
                Math.floor(Math.random() * 3)
              ]
            }
          </h1>
          <div id="info">Someone on your team has answered this question.</div>
        </div>
      )}

      {clientState === clientStates.postAnswerResultsGameState && (
        <div
          id="client-results"
          className={questionResults.correct ? "correct" : "incorrect"}
        >
          <h1>{questionResults.correct ? "Correct!" : "Incorrect"}</h1>
          {questionResults.question.explanation && (
            <div id="answers">{questionResults.question.explanation}</div>
          )}
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
