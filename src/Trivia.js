import React from 'react';
import './Trivia.css';


function Trivia({questionData}) {
    const [wobble, setWobble] = React.useState(0)
    const [showResults, setShowResults] = React.useState(false)
    const [showCorrect, setShowCorrect] = React.useState(false)
    const [showNotCorrect, setShowNotCorrect] = React.useState(false)
    const [shuffleResults, setShuffleResults] = React.useState(true)

    const canShuffle = () => setShuffleResults(true)

    let arr = [questionData.wrongAnswer1, questionData.wrongAnswer2, questionData.wrongAnswer3, questionData.answer]
    shuffle(arr);
    
    let ans = [false, false, false, false]

    // Create list that has the correct and incorrect answers labelled
    let i = 0
    for (i; i < arr.length; i++) {
        if (arr[i] === questionData.answer) {
            ans[i] = true
        }
    } 

    function evaluateAnswer(e) {
        let v = e.target.value;
        console.log(v);
        console.log(typeof(v))
        
        if (v === "true") {
            console.log("Correct answer selected")
            setShowCorrect(true)
        } else {
            setWobble(2);
            setShowNotCorrect(true)
        }

        setShowResults(true)
    }

    return (
    <div className="game">
        <h3 id="question">{questionData.question}</h3>

        <button type="button" className='q' onClick={evaluateAnswer} value={ans[0]}>{arr[0]}</button>
        <button type="button" className='q' onClick={evaluateAnswer} value={ans[1]}>{arr[1]}</button>
        <button type="button" className='q' onClick={evaluateAnswer} value={ans[3]}>{arr[3]}</button>
        <button type="button" className='q' onClick={evaluateAnswer} value={ans[2]}> {arr[2]}</button>
        {showCorrect ? <IsCorrect /> : null}
        {showNotCorrect ? <NotCorrect /> : null}
        {showResults ? <Results info={questionData} /> : null}

        {/* <div class="alignRight">
            <button type="button" className='next' onClick={canShuffle}>Next</button>
        </div> */}

    </div>
    );
}

const Results = ({info}) => (
    <div>
    <p className='explanation'>The answer is {info.answer}.</p>
    <p className='explanation'>{info.explanation}</p>  
    </div>
  )

const IsCorrect = () => (
    <p className='explanation'>🥳Correct!🥳</p>
)

const NotCorrect = () => (
    <p className='explanation'>Incorrect🤔</p>
)

// Shuffle contents of the answers array 
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export default Trivia;