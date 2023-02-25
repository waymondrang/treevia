import { useState } from "react";
import "./TriviaButton.css";

export default function TriviaButton({ answerData, onAnswer, postAnswer }) {
  const [selected, setSelected] = useState(false);

  function triviaOnAnswer(...args) {
    setSelected(true);
    onAnswer(...args);
  }

  return (
    <button
      onClick={() => triviaOnAnswer(answerData.correct)}
      type="button"
      className={
        "trivia-button" +
        (selected ? " selected" : "") +
        (postAnswer ? (answerData.correct ? " correct" : " incorrect") : "")
      }
      disabled={postAnswer}
    >
      {answerData.answer}
      {(selected && (
        <span className="trivia-button-status">
          {answerData.correct ? "You're Correct!" : "Your Answer"}
        </span>
      )) ||
        (postAnswer && answerData.correct && (
          <span className="trivia-button-status">Correct Answer</span>
        ))}
    </button>
  );
}
