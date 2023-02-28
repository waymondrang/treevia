import "./Host.css";
import { useEffect, useState } from "react";

export default function Host({ _io }) {
  var [socketStatus, setSocketStatus] = useState(_io.connected);
  var [roomCode, setRoomCode] = useState("");
  var [hostState, setHostState] = useState(0);
  var [gameState, setGameState] = useState(0);

  useEffect(() => {
    _io.on("connect", () => {
      console.log("Connected to Server");
      setSocketStatus(_io.connected);
    });

    _io.on("hostState", (state) => {
      setHostState(state);
    });

    _io.on("gameState", (state) => {
      setGameState(state);
    });

    _io.on("disconnect", () => {
      console.log("Disconnected from Server");
      setSocketStatus(_io.connected);
    });

    return () => {
      _io.off("connect");
      _io.off("gameState");
      _io.off("hostState");
    };
  }, []);

  function createRoom() {
    console.log("Creating Room...");
    // join room
    _io.emit("createRoom", roomCode);
  }

  return (
    <div id="play">
      <span id="debug">{socketStatus ? "Connected" : "Disconnected"}</span>
      {hostState === 0 && (
        <div id="host">
          <h1>Host Game</h1>
          <input
            onChange={(e) => setRoomCode(e.target.value)}
            value={roomCode}
            type="text"
            placeholder="Room Code"
          />
          <button onClick={createRoom} type="button">
            Create
          </button>
        </div>
      )}
      {hostState === 1 && (
        <div id="lobby">
          <h1>Host Lobby</h1>
        </div>
      )}
    </div>
  );
}
