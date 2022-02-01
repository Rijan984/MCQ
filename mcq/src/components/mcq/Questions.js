import React, { useEffect, useRef, useState } from "react";
import Finished from "./Finished";
import { questions } from "./question";
import "./questions.css";

function Questions() {
  let [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [anss, setAnss] = useState([]);
  const [check, setCheck] = useState(false);
  const [nxtFin, setNxtFin] = useState(false);
  const radiosWrapper = useRef();
  const [result, setResult] = useState("");
  useEffect(() => {
    const findCheckedInput =
      radiosWrapper.current.querySelector("input:checked");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, []);
  const nextQues = (e) => {
    e.preventDefault();
    setCount(count + 1);
    console.log();
    setDisabled(false);
    // console.log(count);
    if (count >= questions.length - 2) {
      setNxtFin(true);
      // setNextDisabled(true);
    }
    console.log(anss);
  };

  const prevQues = (e) => {
    e.preventDefault();
    setCount(count - 1);
    setNxtFin(false);
    // console.log(count);
    if (count <= 1) {
      setDisabled(true);
      setNextDisabled(false);
    }
    if (count < questions.length) {
      setNextDisabled(false);
    }
  };
  const corr = questions.map(({ corrAns }) => corrAns);
  const corrAnss = () => {
    console.log(anss);
    console.log("ss");
    console.log("ssss", corr[0]);
    if (corr === anss) {
      return console.log("correct");
    }
  };
  console.log();

  return (
    <section className="main">
      {check || (
        <div className="main-ques">
          <h1>
            <u>MCQ Online Examination</u>
          </h1>
          <div className="questions">
            <h4>{questions[count].id}.</h4>
            <h4>{questions[count].ques}</h4>
          </div>
          <div className="answers" ref={radiosWrapper}>
            {questions[count].ans.map((answers, i) => {
              return (
                <div className="ans" key={i}>
                  <button
                    type="button"
                    value={answers}
                    name="answers"
                    className=" btn btn-outline-success"
                    onClick={(e, i) => {
                      setAnss([...anss, e.target.value]);

                      setCount(count + 1);
                    }}
                  >
                    {answers}
                  </button>
                </div>
              );
            })}
          </div>
          {/* {questions.map((Ques) => {
        const { id, ques, ans, corrAns } = Ques;
        return (
          <section key={id}>
            <div className="questions">
              <h3>{id}.</h3>
              <h3>{ques}</h3>
            </div>
            {ans.map((anss) => {
              return (
                <>
                  <div>
                    <input type="checkBox" value={ans} name="answers" />
                    {anss}
                  </div>
                </>
              );
            })}
          </section>
        );
      })} */}
          {/* <button onClick={nextQues}>Next</button> */}
          <div className="mcq-btn">
            <button
              onClick={prevQues}
              disabled={disabled}
              className="btn btn-success"
            >
              Prev
            </button>
            {nxtFin && (
              <button
                onClick={() => {
                  setCheck(true);
                  corrAnss();
                }}
                className="btn btn-primary"
                disabled={nextDisabled}
              >
                Finish
              </button>
            )}
            {!nxtFin && (
              <button
                onClick={nextQues}
                className="btn btn-primary"
                disabled={nextDisabled}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
      {check && <Finished correctAns={anss} />}
      {console.log(result)}
    </section>
  );
}

export default Questions;
