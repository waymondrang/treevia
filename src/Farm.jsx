import "./Farm.css";
import React, { Component } from 'react';

class Farm extends Component{
  constructor(props) {
    super(props);
    this.state = {
        sprite: "/images/Tilled Dirt.png",
    };
  }
    render(){
        return (
            <body>
            <img class="farm" src={this.state.sprite} alt="the farm in its basic state"></img>
            </body>
        );
    }
}


export default Farm;