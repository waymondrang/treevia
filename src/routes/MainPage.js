import "../MainPage.css";
import React from 'react';
import { Link } from "react-router-dom";
import Stats from '../components/Stats.jsx';
import Farm from '../components/Farm.jsx';

function MainPage() {
  //var recievedMessage = this.props.location.state.message;
  //console.log(recievedMessage);
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
          <Link to={{ pathname: '/test', state: { message: 'Sustainability' } }}>
            <button className="button">Sustainability </button>
          </Link>
            <br/>
          <Link to={{ pathname: '/test', state: { message: 'Soil' } }}>
            <button className="button">Soil</button>
          </Link>
            <br/>
          <Link to={{ pathname: '/test', state: { message: 'Sustainability' } }}>
            <button className="button">Carbon Emissions</button>
          </Link>
            <br/>
          <Link to={{ pathname: '/test', state: { message: 'Sustainability' } }}>
            <button className="button">Natural Distasters</button>
          </Link>
            <br/>
          <Link to={{ pathname: '/test', state: { message: 'Sustainability' } }}>
            <button className="button">Water</button>
          </Link>
            <br/>
          <Link to={{ pathname: '/test', state: { message: 'Sustainability' } }}>
            <button className="button">Misc</button>
          </Link>
            <br/>
        </div>
      </body>
    </div>
  );
}


export default MainPage;
