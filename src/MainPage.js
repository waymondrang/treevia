import "./MainPage.css";
import React from 'react';
import Stats from './Stats.jsx';
import Farm from './Farm.jsx';

function MainPage() {
  return (
    <div className="MainPage">
      <header>
        <h1>Main Page</h1>
      </header>
      <body>
      <Farm/>
      <Stats/>
        <div className="buttons-list">
          <h2>Select Question Type</h2>
            <button className="button">Productivity </button>
            <br/>
            <button className="button">Resilience</button>
            <br/>
            <button className="button">Eco-friendliness</button>
            <br/>
            <button className="button" disabled>Strategy Question</button>
            <br/>
        </div>
        
      </body>
    </div>
  );
}


export default MainPage;
