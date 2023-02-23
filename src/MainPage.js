import "./MainPage.css";
import React from 'react';
import Stats from './Stats.jsx';
import Farm from './Farm.jsx';

function MainPage() {
  this.state = {
    images:
        [{
            field: "/images/Tilled Dirt.png", //correlates with soil
            irrigation: "",                   //correlates with water
            SustainableProp: "",              
            NatDistaster: "",         
            CarbonEmissions: "",
            misc: "",
            crop0: "",
            crop1: "",
            crop2: "",
            crop3: "",
        }]
  };
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
            <button className="button">Sustainability </button>
            <br/>
            <button className="button">Soil</button>
            <br/>
            <button className="button">Carbon Emissions</button>
            <br/>
            <button className="button">Natural Distasters</button>
            <br/>
            <button className="button">Water</button>
            <br/>
            <button className="button">Misc</button>
            <br/>
        </div>
        
      </body>
    </div>
  );
}


export default MainPage;
