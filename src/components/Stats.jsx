import "../Stats.css";
import "../Farm.css";
import React, { Component } from 'react';

class Stats extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Productivity: 0,
      Resilience: 0,
      Ecofriendliness: 0,
      Average: 0,
    };
    console.log("constructor ran");
  }

  
  componentDidMount(){
    if(this.props.data !== null){
      this.setState(
              { Productivity: this.state.Productivity + this.props.data.Productivity,
                Resilience: this.state.Resilience + this.props.data.Resilience,
                Ecofriendliness:this.state.Ecofriendliness + this.props.data.Ecofriendliness,
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