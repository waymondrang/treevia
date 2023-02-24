import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  
  return (
    <div className="App">
      <body>
        <div className="centered" id="main-menu">
          <Outlet />
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
  );
}

export default App;
