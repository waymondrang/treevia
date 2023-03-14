import React, { useMemo, useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import "./Trivia.css";
import TriviaButton from "./TriviaButton.component";

// Shuffle contents of the answers array
function shuffle(array) {
  if(array == undefined){
    return;
  }
  array.sort(() => Math.random() - 0.5);
  return array;
}

function Trivia({ questionData, nextQuestion }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["sustainability","productivity","soil","carbon","disaster","water"]);
  const [cookies2, setCookie2, removeCookie2] = useCookies(['Button1','Button2','Button3','Button4','Button5','Button6']);
  if(questionData == undefined){
    if(cookies2.Button1 && cookies2.Button2 && cookies2.Button3 && cookies2.Button4 && cookies2.Button5 && cookies2.Button6){
      navigate("/end");
    }else{
      navigate("/local");
    }
  }

  const [showResults, setShowResults] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showNotCorrect, setShowNotCorrect] = useState(false);

  const shuffledAnswers = useMemo(
    () => shuffle([...questionData.answers]),
    [questionData]
  );

  function evaluateAnswer(correct) {
    correct ? setShowCorrect(true) : setShowNotCorrect(true);
    setShowResults(true);
    if(correct){
      switch(questionData.category) {
        case 'sustainability':
          setCookie("sustainability", parseInt(cookies.sustainability) + 1, { path: "/"});
          console.log("Switch sustainability now " + cookies.sustainability);
          break;
        case 'productivity':
          setCookie("productivity",  parseInt(cookies.productivity) + 1, { path: "/"});
          console.log("Switch productivity now " + cookies.productivity);
          break;
        case 'soil':
          setCookie("soil",  parseInt(cookies.soil) + 1, { path: "/" });
          break;
        case 'carbon':
          setCookie("carbon",  parseInt(cookies.carbon) + 1, { path: "/" });
          break;
        case 'disaster':
          setCookie("disaster",  parseInt(cookies.disaster) + 1, { path: "/"});
          break;
        case 'water':
          setCookie("water",  parseInt(cookies.water) + 1, { path: "/"});
          break;  
        default:
          break;
      }
    }
  }

  function triviaNextQuestion(...args) {
    // Reset state
    setShowCorrect(false);
    setShowNotCorrect(false);
    setShowResults(false);
    nextQuestion(...args);
  }

  return (
    <div id="trivia">
      <p id="question">{questionData.question}</p>
      <div className="button-collection">
        {shuffledAnswers.map((answerData, index) => (
          <TriviaButton
            key={answerData.answer}
            answerData={answerData}
            onAnswer={evaluateAnswer}
            postAnswer={showResults}
          />
        ))}
      </div>
      {showCorrect ? <IsCorrect /> : null}
      {showNotCorrect ? <NotCorrect /> : null}
      {showResults ? (
        <Results info={questionData} triviaNextQuestion={triviaNextQuestion} />
      ) : null}
    </div>
  );
}

const Results = ({ info, triviaNextQuestion }) => (
  <div>
    {/* <p className="explanation">The answer is {info.answer}.</p> */}
    <p className="explanation">{info.explanation}</p>
    <div className="alignRight">
      <button onClick={triviaNextQuestion} type="button" className="next">
        Next
      </button>
    </div>
  </div>
);

const IsCorrect = () => <p className="explanation">🥳Correct!🥳</p>;

const NotCorrect = () => <p className="explanation">Incorrect🤔</p>;

// const changeB1Color = () => {};

// const changeB2Color = () => {};

// const changeB3Color = () => {};

// const changeB4Color = () => {};

export default Trivia;
