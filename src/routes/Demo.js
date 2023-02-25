import { useState } from "react";
import Trivia from "../components/Trivia.component";

const questions = [
  {
    question:
      "Drip irrigation is an efficient water method that delivers water directly to the plant’s roots. By how many percent does drip irrigation reduce water usage compared to surface irrigation?",
    answers: [
      {
        answer: "Kelp meal",
        correct: false,
      },
      {
        answer: "Manure",
        correct: false,
      },
      {
        answer: "Compost",
        correct: false,
      },
      {
        answer: "Ammonium phosphate",
        correct: true,
      },
    ],
    explanation:
      "Natural fertilizers are organic substances that contain vital nutrients for plant growth whereas synthetic fertilizers are made of synthesized chemicals like nitrogen, potassium and phosphorus (Hazra). ",
  },
  {
    question: "True or false? 🤔",
    answers: [
      {
        answer: "True",
        correct: true,
      },
      {
        answer: "False",
        correct: true,
      },
    ],
  },
];

export default function Demo() {
  const [questionIndex, setQuestionIndex] = useState(0);

  function nextQuestion() {
    setQuestionIndex((prev) => prev + 1);
  }

  return (
    <Trivia
      questionData={questions[questionIndex]}
      nextQuestion={nextQuestion}
    />
  );
}
