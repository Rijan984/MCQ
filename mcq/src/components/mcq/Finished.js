import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { questions } from "./question";
import "./questions.css";
function Finished({ correctAns }) {
  // const [score, setScore] = useState(0);
  const corr = questions.map(({ corrAns }) => corrAns);
  const navigate = useNavigate();

  //   console.log(corr);
  //   console.log(correctAns);
  let exactAns = corr.filter((correctAnsss) =>
    correctAns.includes(correctAnsss)
  );
  //   console.log(exactAns);

  let perc = (exactAns.length / corr.length) * 100;
  // useEffect(() => {
  //   if (JSON.stringify(corr) === JSON.stringify(correctAns)) {
  //     setScore(perc + "%");
  //   }
  //   // else console.log(exactAns);
  // }, [correctAns, perc, corr, exactAns]);

  return (
    <div className="result">
      <h2>MCQ Exam Completed!!</h2>
      <h3>{Math.round(perc) + "%"}</h3>
      <h3>
        {perc >= 50
          ? "Congratulation!! You Pass The Exam"
          : "Better Luck Next Time!! Fail"}
      </h3>

      <button className="btn btn-success" onClick={() => navigate("/MCQ")}>
        Exit
      </button>
    </div>
  );
}

export default Finished;
