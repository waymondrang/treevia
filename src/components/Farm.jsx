
import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import field1 from '../img/dirt-clearing.png';
import field2 from '../img/seeds.png';
import field3 from '../img/plant-1.png';
import field4 from '../img/plant-2.png';
import field5 from '../img/plant-3.png';
import field6 from '../img/plant-4.png';
import field7 from '../img/final-crop.png';

const cookies = new Cookies();
class Farm extends Component{
  constructor(props) {
    super(props);
    this.state = {
            field: field1, 
    };
  }
  componentDidMount(){
    var sum = parseInt(cookies.get('sustainability')) + parseInt(cookies.get('productivity')) + parseInt(cookies.get('soil'))
              + parseInt(cookies.get('carbon')) + parseInt(cookies.get('disaster')) + parseInt(cookies.get('water'));
    cookies.set("total", sum);

    if(sum >= 3){
        this.setState({field: field2});
    }
    if(sum >= 6){
        this.setState({field: field3});
    }
    if(sum >= 9){
        this.setState({field: field4});
    }
    if(sum >= 12){
        this.setState({field: field5});
    }
    if(sum >= 15){
        this.setState({field: field6});
    }
    if(sum >= 18){
        this.setState({field: field7});
    }
  }
    render(){           
        return (
            <div className="farm">
                <img className="field" src= {this.state.field}  alt="field" ></img>
            </div>
        );
    }
}


export default Farm;