import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "./question";
import "./questions.css";
function Finished({ correctAns, count }) {
  // const [score, setScore] = useState(0);
  const corr = questions.map(({ corrAns }) => corrAns);
  const navigate = useNavigate();

  let exactAns = [];
  // let i = 0;
  for (let i = 0; i < corr.length; i++) {
    if (correctAns[i] === corr[i]) {
      exactAns = [...exactAns, correctAns[i]];
    }
  }
  // console.log(exactAns);
  // console.log("userAns", correctAns[0]);
  // console.log("userAns", correctAns.answers0);
  // console.log("correctAns", corr);

  let perc = (exactAns.length / corr.length) * 100;

  return (
    <div className="result">
      <h2>MCQ Exam Completed!!</h2>
      <h3>{Math.round(perc) + "%"}</h3>
      <h3>
        {perc >= 50
          ? "Congratulation!! You Pass The Exam"
          : "Better Luck Next Time!! Fail"}
      </h3>
      <p>Note: We will inform you the result of the file you have submitted.</p>
      <button className="btn btn-success" onClick={() => navigate("/MCQ")}>
        Exit
      </button>
    </div>
  );
}

export default Finished;
