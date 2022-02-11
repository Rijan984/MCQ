import React from "react";
import { useState } from "react";
import Guide from "./guide/Guide";
import Questions from "./mcq/Questions";
import "../App.css";
import { useDispatch } from "react-redux";
import { ansCheckbox } from "../features/userSlice";
function Start() {
  const [startQuiz, setQuizStart] = useState(false);
  const dispatch = useDispatch();
  const quizStart = (e) => {
    e.preventDefault();
    setQuizStart(true);
    dispatch(
      ansCheckbox({
        checkBox: null,
      })
    );
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
