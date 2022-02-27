import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "./question";
import "./questions.css";
function Finished({ correctAns, count }) {
  // const [score, setScore] = useState(0);
  const corr = questions.map(({ corrAns }) => corrAns);
  const navigate = useNavigate();
  console.log(correctAns);
  // const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  // let s = { s: "ss", ss: "sss" };
  // let n = { s: "ss", ss: "sss" };
  // console.log(equals(s, n));
  let exactAns = [];
  // let i = 0;
  for (let i = 0; i < corr.length - 1; i++) {
    const equals = (correctAns, corr) =>
      JSON.stringify(correctAns) === JSON.stringify(corr);

    if (equals(correctAns[i], corr[i])) {
      console.log(correctAns[i]);
      exactAns = [...exactAns, correctAns[i]];
    }
    // for (let j = 0; j < 4; j++) {
    //   console.log(correctAns[i][j]);

    //   if (correctAns[i][j] === corr[i][j]) {
    //     console.log(correctAns[i][j]);
    //     exactAns = [...exactAns, correctAns[i][j]];
    //   } else {
    //     // console false;
    //     console.log("hey");
    //   }
    // }
  }
  console.log(exactAns.length);

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
