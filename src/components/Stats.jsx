import "../Stats.css";
import "../Farm.css";
import { Cookies } from 'react-cookie';
import React, { Component } from 'react';

const cookies = new Cookies();
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

  /*
  componentDidMount(){
    if(this.props.data !== null){
      this.setState(
              { Sustainability:0,
                Soil:0,
                CarbonEmissions:0,
                NaturalDistasters:0,
                Water:0,
                Productivity:0,
              });
             
    }
  }*/
  

    render(){
      
        return (
            <div className="Stats">
              <header>
                <h1>Stats</h1>
              </header>
              <body>
              <div className="Stat-vals">
                  <p className="Sustainability">{cookies.get('sustainability')}</p>
                  <p className="Productivity">{cookies.get('productivity')}</p>
                  <p className="Soil">{cookies.get('soil')}</p>
                  <p className="CarbonEmissions">{cookies.get('carbon')}</p>
                  <p className="NaturalDistasters">{cookies.get('disaster')}</p>
                  <p className="Water">{cookies.get('water')}</p>
                </div>
                <div className="Stat-names">
                  <p>Sustainability:</p>
                  <p>Productivity:</p>
                  <p>Soil:</p>
                  <p>Carbon Emissions:</p>
                  <p>Natural Distasters:</p>
                  <p>Water:</p>
                </div>
              </body>
            </div> 
        );
    }
}

export default Stats;