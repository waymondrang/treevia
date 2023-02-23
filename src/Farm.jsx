import "./Farm.css";
import React, { Component } from 'react';

class Farm extends Component{
  constructor(props) {
    super(props);
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
  }
  
    render(){            
        return (
            <div className="farm">
                <body>
                    <img class="feild" src={this.state.field}></img>
                    <img class="crop0" src={this.state.crop0}></img>
                    <img class="crop1" src={this.state.crop1}></img>
                    <img class="crop2" src={this.state.crop2}></img>   
                    <img class="crop3" src={this.state.crop3}></img>
                    <img class="irrigation" src={this.state.irrigation}></img>
                    <img class="NatDistaster" src={this.state.NatDistaster}></img>
                    <img class="CarbonEmissions" src={this.state.CarbonEmissions}></img>
                    <img class="SustainableProp" src={this.state.SustainableProp}></img>
                    <img class="misc" src={this.state.misc}></img>
                </body>
            </div>
        );
    }
}


export default Farm;