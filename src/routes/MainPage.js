import "./MainPage.css";
import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Stats from '../components/Stats.jsx';
import Farm from '../components/Farm.jsx';
import questions from "../Resources/questions.json"
import { useNavigate } from "react-router-dom";

function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const stats = location.state;
  console.log("Main page ran");
  const [cookies, setCookie, removeCookie] = useCookies(['Button1','Button2','Button3','Button4','Button5','Button6']);
  const [cookies2, setCookie2, removeCookie2] = useCookies(["sustainability","productivity","soil","carbon","disaster","water", "allSet", "total"]);
  if(!cookies2.allSet){
    removeCookie('Button1');
    removeCookie('Button2');
    removeCookie('Button3');
    removeCookie('Button4');
    removeCookie('Button5');
    removeCookie('Button6');
    setCookie2("sustainability", 0, { path: "/", sameSite: 'Strict' });
    setCookie2("productivity", 0, { path: "/" , sameSite: 'Strict'});
    setCookie2("soil", 0, { path: "/" , sameSite: 'Strict'});
    setCookie2("carbon", 0, { path: "/", sameSite: 'Strict'}); 
    setCookie2("disaster", 0, { path: "/", sameSite: 'Strict'});
    setCookie2("water", 0, { path: "/", sameSite: 'Strict'});
    setCookie2("total", 0, { path: "/", sameSite: 'Strict'});
    setCookie2("allSet", true,{ path: "/", sameSite: 'Strict'});

  }
  
  if(cookies.Button1 && cookies.Button2 && cookies.Button3 && cookies.Button4 && cookies.Button5 && cookies.Button6){
    navigate("/end");
  }

  const onClick1 = () => {
    setCookie('Button1', true, { path: '/',  sameSite: 'Strict'});
  };
  const onClick2 = () => {
    setCookie('Button2', true, { path: '/',  sameSite: 'Strict'});
  };
  const onClick3 = () => {
    setCookie('Button3', true, { path: '/',  sameSite: 'Strict'});
  };
  const onClick4 = () => {
    setCookie('Button4', true, { path: '/',  sameSite: 'Strict'});
  };
  const onClick5 = () => {
    setCookie('Button5', true, { path: '/',  sameSite: 'Strict'});
  };
  const onClick6 = () => {
    setCookie('Button6', true, { path: '/',  sameSite: 'Strict'});
  };

  
  
  const clear = () => {
    /*
    removeCookie('Button1');
    removeCookie('Button2');
    removeCookie('Button3');
    removeCookie('Button4');
    removeCookie('Button5');
    removeCookie('Button6');
    removeCookie2("sustainability");
    removeCookie2("productivity");
    removeCookie2("soil");
    removeCookie2("carbon");
    removeCookie2("disaster");
    removeCookie2("water");
    removeCookie2("allSet");
    window.location.reload();
   */
    setCookie('Button1',true,  { path: '/'});
    setCookie('Button2',true,  { path: '/'});
    setCookie('Button3',true,  { path: '/'});
    setCookie('Button4',true,  { path: '/'});
    setCookie('Button5',true,  { path: '/'});
    setCookie('Button6',true,  { path: '/'});
    navigate("/end"); 
  };
  
  return (
    <div className="MainPage">
      <header>
        <Link to='/'>
            <button>Return to Main</button>
        </Link>
        </header>

      <Stats className="Stats" data = {stats} />
      <div className="body">
      
      <Farm/>

        <div className="buttons-list">
          <h2>Select Question Type</h2>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("sustainability"))}}>
            <button className="button" disabled={cookies.Button1} onClick={onClick1}>Sustainability</button>
          </Link>
            <br/>
            <Link to='/demo' state= {{jason: JSON.stringify(makeList("productivity"))}}>
            <button className="button" disabled={cookies.Button2} onClick={onClick2}>Productivity</button>
          </Link>
            <br/>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("soil"))}}>
            <button className="button" disabled={cookies.Button3} onClick={onClick3}>Soil</button>
          </Link>
            <br/>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("carbon"))}}>
            <button className="button" disabled={cookies.Button4} onClick={onClick4}>Carbon Emissions</button>
          </Link>
            <br/>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("disaster"))}}>
            <button className="button" disabled={cookies.Button5} onClick={onClick5}>Natural Distasters</button>
          </Link>
            <br/>
          <Link to='/demo' state= {{jason: JSON.stringify(makeList("water"))}}>
            <button className="button" disabled={cookies.Button6} onClick={onClick6}>Water</button>
          </Link>
            <br/>
        </div>
      </div>
    </div>
  );
}

function makeList(label){
  var questArr = questions.filter(element => element.category === label);
  var final = [];
  var int1 = Math.trunc((Math.random()*questArr.length));
  var int2 = int1;
  var int3 = int1;
  while(int2 === int1){
    int2 = Math.trunc((Math.random()*questArr.length));
  }
  while(int3 === int1 || int3 === int2){
    int3 = Math.trunc((Math.random()*questArr.length));
  }
  var intArr = [int1, int2, int3]; 
  for(var i = 0; i < 3; i++){
    var int = intArr[i];
    var question = questArr[int];
    final[i] = question;
  }
  return final;
}

export default MainPage;
