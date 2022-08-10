import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    //create timer const that will run the setTimeout
    const timer = setTimeout(() => setTimeRemaining(timeRemaining => timeRemaining - 1), 1000);

    //if timeRemaining is 0, the answer is false and we rest the timer
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return;
    }

    //we clear the timer when there are no more questions
    return function (){
      clearTimeout(timer);
    }

    //the useEffect runs whenever timeRemaining changes (countdown) or when the question is answered
  }, [timeRemaining, onAnswered])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
