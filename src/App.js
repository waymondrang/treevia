import logo from './logo.svg';
import './App.css';
import React from 'react';
import Trivia from './Trivia.js';



function App() {
  let state = {
    question: {
      question: "Example Question: How do nitrates affect soil?",
      wrongAnswer1: "12",
      wrongAnswer2: "13",
      wrongAnswer3: "15",
      answer: "27"
    },
  };
  return (
    
    <Trivia questionData={state.question}/>
    // <div className="App">
    //   <header className="App-header">
        
        /*{ <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> }*/
    //   </header>
    // </div>
  );
}

export default App;
