import React from "react";
import { useState } from "react";
import Guide from "./guide/Guide";
import Questions from "./mcq/Questions";
function Start() {
  const [startQuiz, setQuizStart] = useState(false);
  const quizStart = (e) => {
    e.preventDefault();
    setQuizStart(true);
  };
  return (
    <div className="App">
      {!startQuiz && (
        <>
          <h4>Start the quiz</h4>
          <button onClick={quizStart} className="btn btn-success">
            Start
          </button>
          <Guide />
        </>
      )}
      {startQuiz && <Questions />}
    </div>
  );
}

export default Start;
