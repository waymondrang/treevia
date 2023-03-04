import "../MainPage.css";
import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Stats from '../components/Stats.jsx';
import Farm from '../components/Farm.jsx';
import questions from "../Resources/questions.json"

function MainPage() {
  const location = useLocation();
  const stats = location.state;
  console.log("Main page ran");

  return (
    <div className="MainPage">
      <header>
        <h1>Main Page</h1>
      </header>
      <body>
      <Farm/>
      <Stats  data = {stats}/>
        <div className="buttons-list">
          <h2>Select Question Type</h2>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("..."))}}>
            <button className="button">Sustainability </button>
          </Link>
            <br/>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("..."))}}>
            <button className="button">Soil</button>
          </Link>
            <br/>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("..."))}}>
            <button className="button">Carbon Emissions</button>
          </Link>
            <br/>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("..."))}}>
            <button className="button">Natural Distasters</button>
          </Link>
            <br/>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("..."))}}>
            <button className="button">Water</button>
          </Link>
            <br/>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("..."))}}>
            <button className="button">Misc</button>
          </Link>
            <br/>
        </div>
      </body>
    </div>
  );
}

function makeList(label){
  var questArr = questions.filter(element => element.category === label);
  var final = [];
  for(var i = 0; i < 3; i++){
    var int = Math.trunc((Math.random()*questArr.length));
    var question = questArr[int];
    final[i] = question;
  }
  return final;
}

export default MainPage;
