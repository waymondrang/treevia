import "./App.css";

function App() {
  let state = {
    question: {
      question: "Drip irrigation is an efficient water method that delivers water directly to the plant’s roots. By how many percent does drip irrigation reduce water usage compared to surface irrigation?",
      wrongAnswer1: "Kelp meal",
      wrongAnswer2: "Manure",
      wrongAnswer3: "Compost",
      answer: "Ammonium phosphate",
      explanation: "Natural fertilizers are organic substances that contain vital nutrients for plant growth whereas synthetic fertilizers are made of synthesized chemicals like nitrogen, potassium and phosphorus (Hazra). "
    },
  };

  
  return (
    <div className="App">
      <header>
        <h1>Template Text</h1>
      </header>
      <body>
        <p>Template Text</p>
        <button>button</button>
      </body>
    </div>
  );
}

export default App;
