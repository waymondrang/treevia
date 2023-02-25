import React, { useMemo, useState } from "react";
import "./Trivia.css";
import TriviaButton from "./TriviaButton.component";

// Shuffle contents of the answers array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

function Trivia({ questionData }) {
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
      {showResults ? <Results info={questionData} /> : null}
    </div>
  );
}

const Results = ({ info }) => (
  <div>
    {/* <p className="explanation">The answer is {info.answer}.</p> */}
    <p className="explanation">{info.explanation}</p>
    <div className="alignRight">
      <button type="button" className="next">
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
