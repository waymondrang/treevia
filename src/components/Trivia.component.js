import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Trivia.css";
import TriviaButton from "./TriviaButton.component";
import Stats from "./Stats";

// Shuffle contents of the answers array
function shuffle(array) {
  if(array == undefined){
    return;
  }
  array.sort(() => Math.random() - 0.5);
  return array;
}

function Trivia({ questionData, nextQuestion }) {

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
