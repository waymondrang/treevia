import Trivia from "../components/Trivia.component";

let state = {
  question: {
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
};

export default function Demo() {
  return <Trivia questionData={state.question} />;
}
