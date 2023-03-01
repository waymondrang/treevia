import "./Play.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

export default function Play({ _io }) {
  var [socketStatus, setSocketStatus] = useState(_io.connected);
  var [roomCode, setRoomCode] = useState("");
  var [gameState, setGameState] = useState(0);
  var [gameError, setGameError] = useState("");

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
      setGameError(error);
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

  function joinRoom() {
    if (!_io.connected) {
      console.log("No Connection to Server");
      setGameError("No Connection to Server.");
      return;
    }
    console.log("Joining Room...");
    // join room
    _io.emit("joinRoom", roomCode);
  }

  return (
    <div id="play">
      <span id="debug">{socketStatus ? "Connected" : "Disconnected"}</span>
      {gameState === 0 && (
        <div id="join">
          <h1>Join Game</h1>
          <input
            onChange={(e) => setRoomCode(e.target.value)}
            value={roomCode}
            type="text"
            placeholder="Room Code"
          />
          <button onClick={joinRoom} type="button">
            Join
          </button>
        </div>
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

      {gameError && (
        <div id="error">
          <span>Oops! {gameError}</span>
        </div>
      )}
    </div>
  );
}
