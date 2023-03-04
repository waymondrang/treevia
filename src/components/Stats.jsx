import "../Stats.css";
import "../Farm.css";
import React, { Component } from 'react';

class Stats extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Sustainability:0,
      Soil:0,
      CarbonEmissions:0,
      NaturalDistasters:0,
      Water:0,
      Misc:0,
      Average:0
    }
    console.log("constructor ran");
  }

  
  componentDidMount(){
    if(this.props.data !== null){
      this.setState(
              { Sustainability:0,
                Soil:0,
                CarbonEmissions:0,
                NaturalDistasters:0,
                Water:0,
                Misc:0,
                Average:(((this.state.Productivity + this.props.data.Productivity)+(this.state.Resilience + this.props.data.Resilience)+(this.state.Ecofriendliness + this.props.data.Ecofriendliness))/3).toFixed(2) 
              });
              console.log("Did mount and state is now"+ this.state.Productivity +", "+ this.state.Ecofriendliness+", "+this.state.Resilience);
    }
  }
  

    render(){
      console.log("Render running and state is Productivity:"+ this.state.Productivity +", Ecofriendliness:"+ this.state.Ecofriendliness+", Resilience:"+this.state.Resilience);
        return (
            <div className="Stats">
              <header>
                <h1>Stats</h1>
              </header>
              <body>
              <div className="Stat-vals">
                  <p className="Sustainability">{this.state.Sustainability}</p>
                  <p className="Soil">{this.state.Soil}</p>
                  <p className="CarbonEmissions">{this.state.CarbonEmissions}</p>
                  <p className="NaturalDistasters">{this.state.NaturalDistasters}</p>
                  <p>{this.state.Water}</p>
                  <p>{this.state.Misc}</p>
                  <p>{this.state.Average}</p>
                </div>
                <div className="Stat-names">
                  <p>Sustainability:</p>
                  <p>Soil:</p>
                  <p>Carbon Emissions:</p>
                  <p>Natural Distasters:</p>
                  <p>Water:</p>
                  <p>Misc:</p>
                  <p>Average:</p>
                </div>
              </body>
            </div> 
        );
    }
}

export default Stats;