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
  
    render(){
        return (
            <div className="Stats">
              <header>
                <h1>Stats</h1>
              </header>
              <body>
                <div className="Stat-vals">
                  <p>Productivity:{this.state.Productivity}</p>
                  <p>Resilience:{this.state.Resilience}</p>
                  <p>Eco-friendliness:{this.state.Ecofriendliness}</p>
                  <p>Average:{this.state.Average}</p>
                </div>
              </body>
            </div>
           
        );
    }
}


export default Stats;