import { useState } from "react";
import "./App.css";
import Guide from "./components/guide/Guide";
import Questions from "./components/mcq/Questions";

function App() {
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

export default App;
