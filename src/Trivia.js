import React, { useCallback } from 'react';
import './Trivia.css';


function Trivia({questionData}) {
    let arr = [questionData.wrongAnswer1, questionData.wrongAnswer2, questionData.wrongAnswer3, questionData.answer]
    shuffle(arr);
    
    let ans = [false, false, false, false]

    let i = 0
    for (i; i < arr.length; i++) {
        if (arr[i] === questionData.answer) {
            ans[i] = true
        }
        // if (arr[i].localCompare(questionData.answer) == 0) {
        //     ans[i] = true
        // }
    } 


    return (
    <div className="game">
        <h2 id="question">{questionData.question}</h2>

        <button type="button" onClick={evaluateAnswer} value={ans[0]}>{arr[0]}</button>
        <button type="button" onClick={evaluateAnswer} value={ans[1]}>{arr[1]}</button>
        <button type="button" onClick={evaluateAnswer} value={ans[2]}>{arr[2]}</button>
        <button type="button" onClick={evaluateAnswer} value={ans[3]}>{arr[3]}</button>

    </div>
    );
}

// Shuffle contents of the answers array 
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


function evaluateAnswer(e) {
    let v = e.target.value;
    console.log(v);
    // console.log(answer)
    
    // if (a.answer.compare(v) == 0) {
    //     console.log(true);    
    // } else {
    //     console.log(false);
    // }
}

export default Trivia;