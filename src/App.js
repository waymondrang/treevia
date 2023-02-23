import { Link } from "react-router-dom";
import "./App.css";
import React from 'react';
import MainPage from './MainPage.js';

function App() {
  
  return (
    <MainPage/>
    /*
    <div className="App">
      <body>
        <div className="centered" id="main-menu">
          <div className="centered">
            <h1>UntitledTrivia</h1>
            <div className="button-collection">
              <Link to={`/join`} className="button-link">
                <button>
                  <span>Join</span>
                </button>
              </Link>
              <Link to={`/host`} className="button-link">
                <button>
                  <span>Host</span>
                </button>
              </Link>
              <Link to={`/local`} className="button-link">
                <button>
                  <span>Local</span>
                </button>
              </Link>
            </div>
          </div>
          <div className="expand-container">
            <span class="material-symbols-rounded expand-icon">
              expand_more
            </span>
          </div>
        </div>
        <div className="centered" id="about-section">
          <div id="about-section-contents">
            <h2>About</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
              cras ornare arcu dui vivamus arcu felis bibendum ut. Magna eget
              est lorem ipsum dolor sit. Duis ut diam quam nulla. Sit amet massa
              vitae tortor condimentum lacinia quis. Mauris sit amet massa vitae
              tortor condimentum lacinia quis vel. Aliquet eget sit amet tellus
              cras adipiscing enim.
            </p>
          </div>
        </div>
      </body>
    </div>
    */
  );
}

export default App;
