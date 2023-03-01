import "./Host.css";
import { useEffect, useState } from "react";

export default function Host({ _io }) {
  var [socketStatus, setSocketStatus] = useState(_io.connected);
  var [roomCode, setRoomCode] = useState("");
  var [hostState, setHostState] = useState(0);
  var [gameState, setGameState] = useState(0);
  var [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    _io.connect();

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

    _io.on("completeGameState", (gameState) => {
      console.log("Game State Update", gameState);
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
      _io.off("gameState");
      _io.off("hostState");
    };
  }, []);

  function createRoom() {
    console.log("Creating Room...");
    // join room
    _io.emit("createRoom", roomCode);
  }

  function startGame() {
    console.log("Starting Game...");
    // start game
    _io.emit("startGame");
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
          <h1>{roomCode}</h1>
          <div id="player-list">
            <h2>Players</h2>
            <ul>
              {playerList.map((player) => (
                <li key={player.id}>{player.id}</li>
              ))}
            </ul>
          </div>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
      {hostState === 2 && (
        <div id="game">
          <h1>Question Zone</h1>
          <div id="question">
            <h2>Question</h2>
            <p>Question Text</p>
          </div>
        </div>
      )}
    </div>
  );
}
