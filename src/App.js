import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="centered" id="top-section">
        <Outlet />
        <div className="expand-container">
          <span className="material-symbols-rounded expand-icon">
            expand_more
          </span>
        </div>
      </div>
      <div className="centered" id="about-section">
        <div id="about-section-contents">
          <h2>About</h2>
          <p>
          __________ is a trivia question-answer style game created by Shilpa Chowbey,
          Sophia Conti, Annabella Macaluso, Jessica Wang and Raymond Wang. The questions
          in this game target various climate issues that relate to agriculture and the
          effect of climate change on farming. We hope this game will provide a fun and
          positive experiences around learning about farming, sustainability in agriculture
          and climate change.
          <br/><br/>
          Our questions have been sourced and created from academic journals and papers 
          that cover topics such as carbon emissions, natural disasters, soil health, 
          runoff and more. We've also included questions about atypical agricultural 
          methods from indigenous practices or local methods that aren't traditionally 
          used in commercial farming. We hope to promote new voices within this game 
          and create awareness about different cultures and communities and how they 
          view agriculture and growing/raising food.

          <h2>Works Cited</h2>
          To view the academic sources that inspired our questions please visit our
          <a href="https://docs.google.com/document/d/1H7Azjt2KjgiOQvH1CjradjMEeKGepyI14xim5sDZ7MU/edit?usp=sharing">Work's Cited Document</a>.

          <h2>How to Play</h2>
          Our game comes in two modes! Play in either online multiplayer format with your 
          friends or explore our adventurous story mode on your own.

          <h3>Online Multiplayer</h3>
          On a host device where all players can view the screen click the 'Host' button to create a 
          new Room for players to join. Share the room code you enter with players so they can join the game.
          <br/><br/>
          For all other players joining, click the 'Join' button. Enter the room code created by the host and 
          join the room. Wait for all other players to join and then get ready to play the game! Correct
          answers to trivia questions will increase your score and incorrect answers will decrease your score.
          Compete to get the highest score among your fellow players!

          <h3>Story Mode</h3>
          Select the 'Local' button to start a new story mode game. In story mode, you're provided a plot of 
          land to build your own farm! Select from the six different categories of questions and answer
          correctly in order to help your farm grow and thrive.   
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
