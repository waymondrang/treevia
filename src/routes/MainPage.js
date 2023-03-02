import "../MainPage.css";
import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Stats from '../components/Stats.jsx';
import Farm from '../components/Farm.jsx';
import questions from "../Resources/questions.json"

function MainPage() {
  
  const data1 = {
    message: "Sustainability"
  }
  const data2 = {
    message: "Soil"
  }
  const data3 = {
    message: "Carbon Emissions"
  }
  const data4 = {
    message: "Natural Distasters"
  }
  const data5 = {
    message: "Water"
  }
  const data6 = {
    message: "Misc"
  }
  
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
          <Link to='/trivia' state= {data1}>
            <button className="button">Sustainability </button>
          </Link>
            <br/>
          <Link to='/trivia' state= {data2}>
            <button className="button">Soil</button>
          </Link>
            <br/>
          <Link to='/trivia' state= {data3}>
            <button className="button">Carbon Emissions</button>
          </Link>
            <br/>
          <Link to='/trivia' state= {data4}>
            <button className="button">Natural Distasters</button>
          </Link>
            <br/>
          <Link to='/trivia' state= {data5}>
            <button className="button">Water</button>
          </Link>
            <br/>
          <Link to='/trivia' state= {data6}>
            <button className="button">Misc</button>
          </Link>
            <br/>
        </div>
      </body>
    </div>
  );
}

function makeList(){
  questions = questions.filter();
  return null;
}

export default MainPage;
