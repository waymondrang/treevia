import "./Play.css";
import io from "socket.io-client";
import { useState } from "react";

export default function Play() {
  var [socketStatus, setSocketStatus] = useState("Disconnected");
  var [roomCode, setRoomCode] = useState("");
  var [gameState, setGameState] = useState(0);

  function joinGame() {
    console.log("Joining Game...");
    const _io = io("http://localhost:3001");
    _io.on("connect", () => {
      setSocketStatus("Connected");
      console.log("Connected to Server");
      // join room
      _io.emit("joinRoom", roomCode);

      _io.on("gameState", (state) => {
        setGameState(state);
      });
    });
  }

  return (
    <div id="play">
      <span id="debug">{socketStatus}</span>
      {gameState === 0 && (
        <div id="join">
          <h1>Join Game</h1>
          <input
            onChange={(e) => setRoomCode(e.target.value)}
            value={roomCode}
            type="text"
            placeholder="Room Code"
          />
          <button onClick={joinGame} type="button">
            Join
          </button>
        </div>
      )}
      {gameState === 1 && (
        <div id="waiting">
          <h1>Waiting for Game to Start</h1>
        </div>
      )}
    </div>
  );
}
