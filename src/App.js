import './App.css';
import React from 'react';
import Trivia from './Trivia.js';



function App() {
  let state = {
    question: {
      question: "Drip irrigation is an efficient water method that delivers water directly to the plant’s roots. By how many percent does drip irrigation reduce water usage compared to surface irrigation?",
      wrongAnswer1: "Kelp meal",
      wrongAnswer2: "Manure",
      wrongAnswer3: "Compost",
      answer: "Ammonium phosphate",
      explanation: "Natural fertilizers are organic substances that contain vital nutrients for plant growth whereas synthetic fertilizers are made of synthesized chemicals like nitrogen, potassium and phosphorus (Hazra). "
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
