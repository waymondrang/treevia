import "../Farm.css";
import React, { Component } from 'react';
import field1 from '../img/field_1.png';
import field2 from '../img/field_2.png';
import field3 from '../img/field_3.png';
import field4 from '../img/field_4.png';
import field5 from '../img/field_5.png';
import field6 from '../img/field_6.png';
import field7 from '../img/field_7.png';


class Farm extends Component{
  constructor(props) {
    super(props);
    this.state = {
            field: field1, 
    };
  }
  imgState(){
    this.setState({
        field: field2, //correlates with soil
    })
  }
    render(){           
        return (
            <div className="farm">
                <body>
                    <img class="field" src= {this.state.field}  alt="field" ></img>
                </body>
            </div>
        );
    }
}


export default Farm;