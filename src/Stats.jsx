import "./Stats.css";
import React, { Component } from 'react';

class Stats extends Component{
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      Productivity: 0,
      Resilience: 0,
      Ecofriendliness: 0,
      Average: 0,
    };
  }
  setState
    render(){
        return (
            <div className="Stats">
              <header>
                <h1>Stats</h1>
              </header>
              <body>
              <div className="Stat-vals">
                  <p>{this.state.Productivity}</p>
                  <p>{this.state.Resilience}</p>
                  <p>{this.state.Ecofriendliness}</p>
                  <p>{this.state.Average}</p>
                </div>
                <div className="Stat-names">
                  <p>Productivity:</p>
                  <p>Resilience:</p>
                  <p>Eco-friendliness:</p>
                  <p>Average:</p>
                </div>
                
              </body>
            </div> 
        );
    }
}


export default Stats;