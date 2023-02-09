import "./App.css";

function App() {
  return (
    <div className="App">
      <body>
        <div className="splash-container">
          <div className="splash">
            <h1>UntitledTrivia</h1>
            <div className="button-collection">
              <button className="game-button" disabled>
                <span>Join</span>
              </button>
              <button className="game-button" disabled>
                <span>Host</span>
              </button>
              <button className="game-button">
                <span>Local</span>
              </button>
            </div>
          </div>
          <div className="expand-container">
            <span class="material-symbols-rounded expand-icon">
              expand_more
            </span>
          </div>
        </div>
        <div>
          <h2>About</h2>
        </div>
      </body>
    </div>
  );
}

export default App;
