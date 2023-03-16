import "./Host.css";
import { useEffect, useState } from "react";
import questionsRaw from "../util/general_questions.json";
import HostStates from "../util/HostStates";
import ProgressBar from "../components/ProgressBar.component";

const maxQuestions = 10;

export default function Host({ _io }) {
  const [socketStatus, setSocketStatus] = useState(_io.connected);
  const [completeGameState, setCompleteGameState] = useState({});
  const [teamList, setTeamList] = useState([]);
  const [gameError, setGameError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [hostState, setHostState] = useState(HostStates.createGameHostState);
  const [questionCount, setQuestionCount] = useState(0);
  const [questionSet, setQuestionSet] = useState(questionsRaw);
  const [questionWaitTime, setQuestionWaitTime] = useState(-1);

  useEffect(() => {
    _io.connect();

    _io.on("connect", () => {
      console.log("Connected to Server");
      setSocketStatus(_io.connected);
    });

    _io.on("gameError", (error) => {
      console.log("Game Error", error);
      setGameError(error);
    });

    _io.on("hostState", (state) => {
      console.log("_io Listener Host State Update", state);
      if (state === HostStates.getReadyHostState) startGameCycle();
      // may not need to handle different local and remote host states
      setHostState(state);
    });

    _io.on("completeGameState", (gameState) => {
      console.log("Game State Update", gameState);
      setCompleteGameState(gameState);
      setTeamList(gameState.teams);
      // do not update hostState via completeGameState listener
    });

    _io.on("disconnect", () => {
      console.log("Disconnected from Server");
      setSocketStatus(_io.connected);
      setGameError("Disconnected from Server");
      // reset game state
      setHostState(HostStates.createGameHostState);
      setCompleteGameState({});
      setTeamList([]);
      setQuestionCount(0);
    });

    return () => {
      // disconnect from server
      _io.disconnect();
      // remove event listeners
      _io.off("connect");
      _io.off("hostState");
      _io.off("completeGameState");
      _io.off("gameError");
      _io.off("disconnect");
    };
  }, []);

  /**
   * Check if all players have answered
   */
  useEffect(() => {
    if (
      hostState === HostStates.answerHostState &&
      completeGameState.currentQuestion
    ) {
      if (
        Object.keys(completeGameState.currentQuestion.teamAnswers).length ===
        completeGameState.teams.length
      ) {
        console.log("All players have answered");
        // broadcast answers
        _io.emit("requestResults");
      }
    }
  }, [completeGameState, hostState, _io]);

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

  function scrambleAnswers(question) {
    let answers = question.answers;
    let scrambledAnswers = [];

    while (answers.length > 0) {
      let index = Math.floor(Math.random() * answers.length);
      scrambledAnswers.push(answers[index]);
      answers.splice(index, 1);
    }

    question.answers = scrambledAnswers;
    return question;
  }

  async function startGameCycle() {
    console.log("Starting Game Cycle...");
    // start game cycle
    setHostState(HostStates.getReadyHostState);
    // wait for 3 seconds
    await waitForTimeout(1);
    // start game
    nextQuestion();
  }

  async function nextQuestion() {
    if (questionCount === maxQuestions) {
      console.log("Game Over");
      setHostState(HostStates.finalResultsHostState);
      return;
    }

    // choose question and update question set
    let question = questionSet[Math.floor(Math.random() * questionSet.length)];
    console.log("Question", question);
    question = scrambleAnswers(question);
    question = assignColorsToQuestion(question);

    console.log("Question", question);
    setCurrentQuestion(question);

    let newCompleteGameState = { ...completeGameState };
    newCompleteGameState.currentQuestion = undefined;

    setCompleteGameState(newCompleteGameState);
    setQuestionSet(questionSet.filter((q) => q !== question));
    setQuestionCount(questionCount + 1);

    // start game
    setHostState(HostStates.questionHostState);

    // display question for random seconds from 3 to 5
    let timeoutTime = Math.floor(Math.random() * 3) + 3;
    setQuestionWaitTime(timeoutTime);
    await waitForTimeout(timeoutTime);

    // show answers
    setHostState(HostStates.answerHostState);

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
    // set local host state (no)
    // setHostState(HostStates.lobbyHostState);
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
      {hostState === HostStates.createGameHostState && (
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

      {hostState === HostStates.lobbyHostState && (
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

      {hostState === HostStates.getReadyHostState && (
        <div id="ready">
          <h1>Get Ready!</h1>
        </div>
      )}

      {hostState === HostStates.questionHostState && (
        <div id="host-question">
          <span className="question-text">{currentQuestion.question}</span>
          <ProgressBar questionWaitTime={questionWaitTime} />
        </div>
      )}

      {hostState === HostStates.answerHostState && (
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

      {hostState === HostStates.resultsHostState && (
        <div id="host-results">
          <div id="control-panel">
            <h1>Question {questionCount} Results</h1>
            <button onClick={nextQuestion}>
              {questionCount === maxQuestions ? "Results" : "Next Question"}
            </button>
          </div>
          <div id="winning-teams">
            {/* top 5 teams */}
            {completeGameState.teams
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((team, index) => (
                <div
                  key={team.name}
                  className={"team" + (index === 0 ? " first" : "")}
                >
                  <div>
                    <span className="team-placement">
                      {index + 1}
                      {index === 0
                        ? "st"
                        : index === 1
                        ? "nd"
                        : index === 2
                        ? "rd"
                        : "th"}
                    </span>
                    <span className="team-name">{team.name}</span>
                  </div>
                  <span className="team-score small-text">
                    {team.score} {team.score === 1 ? "point" : "points"}
                  </span>
                </div>
              ))}
            {/* fill if less than 5 teams */}
            {completeGameState.teams.length < 5 &&
              Array(5 - completeGameState.teams.length)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="team">
                    <span className="team-name"></span>
                  </div>
                ))}
          </div>
        </div>
      )}

      {hostState === HostStates.finalResultsHostState && (
        <div id="host-final-results">
          <div id="winning-teams">
            {/* top 3 teams */}
            {completeGameState.teams
              .sort((a, b) => b.score - a.score)
              .slice(0, 3)
              .map((team, index) => (
                <div
                  key={team.name}
                  className={"team " + ["first", "second", "third"][index]}
                >
                  <div>
                    <span className="team-placement">
                      {index + 1}
                      {index === 0
                        ? "st"
                        : index === 1
                        ? "nd"
                        : index === 2
                        ? "rd"
                        : "th"}
                    </span>
                    <span className="team-name">{team.name}</span>
                  </div>
                  <span className="team-score small-text">
                    {team.score} {team.score === 1 ? "point" : "points"}
                  </span>
                </div>
              ))}
            {/* fill if less than 3 teams */}
            {completeGameState.teams.length < 3 &&
              Array(3 - completeGameState.teams.length)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="team">
                    <span className="team-name"></span>
                  </div>
                ))}
          </div>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Restart Game (Reload)
          </button>
        </div>
      )}
    </div>
  );
}
