import "./Host.css";
import { useEffect, useRef, useState } from "react";
import nobody from "../img/nobody.png";
import questionsRaw from "../questions.json";

export default function Host({ _io }) {
  const [socketStatus, setSocketStatus] = useState(_io.connected);
  const [completeGameState, setCompleteGameState] = useState({});
  const [teamList, setTeamList] = useState([]);
  const [gameCycle, setGameCycle] = useState(0);
  const [gameError, setGameError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [hostState, setHostState] = useState(0);

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
      setHostState(state);
    });

    _io.on("completeGameState", (gameState) => {
      console.log("Game State Update", gameState);
      setCompleteGameState(gameState);
      setTeamList(gameState.teams);
      setHostState(gameState.hostState);
    });

    _io.on("disconnect", () => {
      console.log("Disconnected from Server");
      setSocketStatus(_io.connected);
      setGameError("Disconnected from Server");
      // reset game state
      setCompleteGameState({});
      setTeamList([]);
      setHostState(0);
      setGameCycle(0);
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
        Object.keys(completeGameState.currentQuestion.teamAnswers).length ===
        completeGameState.teams.length
      ) {
        console.log("All players have answered");
        // broadcast answers
        _io.emit("requestResults");
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
    _io.emit("createRoom");
    // do not set local host state, wait for server
  }

  function startGame() {
    console.log("Starting Game...");
    // start game
    _io.emit("startGame");
    // do not set local host state, wait for server
  }

  return (
    <div id="play">
      <span id="debug">{socketStatus ? "Connected" : "Disconnected"}</span>
      {hostState === 0 && (
        <div>
          <form id="host">
            <h1>Host Game</h1>
            <button onClick={createRoom} type="submit">
              Create
            </button>
            <p className="small-text">
              A room code will be automatically generated.
            </p>
          </form>
          {gameError && (
            <div id="error">
              <span>Oops! {gameError}</span>
            </div>
          )}
        </div>
      )}

      {hostState === 1 && (
        <div id="lobby">
          <div id="control-panel">
            <div id="room-code">
              <h1>{completeGameState.roomCode}</h1>
            </div>
            <button onClick={startGame} disabled={teamList.length === 0}>
              Start Game
            </button>
          </div>
          <div id="team-list">
            <h2>Teams</h2>
            {teamList.length ? (
              <div id="teams">
                {teamList.map((team) => (
                  <div key={team.name} className="team-card">
                    <h3 className="team-name">{team.name}</h3>
                    {team.players.map((player) => (
                      <div key={player.name} className="team-player">
                        <span>{player.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div id="empty-team-list">
                <p>Create a sharable link for players to quickly join!</p>
                <button
                  onClick={(e) => {
                    navigator.clipboard.writeText(
                      window.location.host +
                        "/play?roomCode=" +
                        completeGameState.roomCode
                    );
                    e.target.innerText = "Copied!";
                    e.target.classList.add("copied");
                    setTimeout(() => {
                      e.target.innerText = "Copy Link";
                      e.target.classList.remove("copied");
                    }, 1500);
                  }}
                >
                  Copy Link
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* gameCycle does not have 0 state */}

      {hostState === 2 && (
        <div id="ready">
          <h1>Get Ready!</h1>
        </div>
      )}

      {hostState === 3 && (
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
        <div>
          <div id="control-panel">
            <h1>Results</h1>
            <button onClick={nextQuestion}>Next Question</button>
          </div>
          <div id="results">
            {/* top 5 teams */}
            {completeGameState.teams
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((team, index) => (
                <div key={team.name} className="result-team">
                  <h3 className="result-team-name">
                    ({index}) {team.name}
                  </h3>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
