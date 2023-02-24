import Trivia from "../components/Trivia";

let state = {
  question: {
    question:
      "Drip irrigation is an efficient water method that delivers water directly to the plant’s roots. By how many percent does drip irrigation reduce water usage compared to surface irrigation?",
    wrongAnswer1: "Kelp meal",
    wrongAnswer2: "Manure",
    wrongAnswer3: "Compost",
    answer: "Ammonium phosphate",
    explanation:
      "Natural fertilizers are organic substances that contain vital nutrients for plant growth whereas synthetic fertilizers are made of synthesized chemicals like nitrogen, potassium and phosphorus (Hazra). ",
  },
};

export default function Demo() {
  return <Trivia questionData={state.question} />;
}
