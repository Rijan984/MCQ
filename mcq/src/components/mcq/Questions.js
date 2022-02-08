import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ans, selectTime, selectUser, timers } from "../../features/userSlice";
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
  // const radiosWrapper = useRef();
  // const [result, setResult] = useState("");
  const [time, setTime] = useState("60 sec");
  const [min, setMin] = useState(2);
  const [warn, setWarn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [indexVal, setindexVal] = useState();
  // const [checks, setChecks] = useState(false);

  useEffect(() => {
    function Timerss() {
      let timer = 60;

      const timerInterval = setInterval(() => {
        timer = timer - 1;
        // const min = timer / 60;
        if (timer <= 0) {
          timer = 60;
          setMin(min - 1);
        }
        setTime(`${timer} sec`);
        // console.log(timer);
        if (min === 0) {
          clearInterval(timerInterval);
          console.log("hey");
        }
      }, 1000);
    }
    Timerss();

    if (min === 0) {
      setCheck(true);
      dispatch(
        ans({
          answer: anss,
        })
      );
      navigate("/result");
    }
    if (min === 1) {
      setWarn(true);
    }
  }, [min, navigate, dispatch]);

  const nextQues = (e) => {
    let unCheck = document.querySelectorAll("input")[indexVal];
    unCheck.checked = false;
    e.preventDefault();
    setCount(count + 1);

    setDisabled(false);
    // console.log(count);
    if (count >= questions.length - 2) {
      setNxtFin(true);
      // setNextDisabled(true);
    }
  };

  const ansSet = (e, i) => {
    setAnss([...anss, e.target.value]);
    // console.log("ss", i);
    let ind = i;
    // console.log(ind);
    setindexVal(ind);
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
    // console.log(anss);
    // console.log("ss");
    // console.log("ssss", corr[0]);
    if (corr === anss) {
      return console.log("correct");
    }
    dispatch(
      ans({
        answer: anss,
      })
    );
    navigate("/result");
  };
  // console.log();

  return (
    <section className="main">
      <p></p>

      {/* <Timer countdownTimestampMs={1643673600000} /> */}
      {check || (
        <div className="main-ques">
          {warn && (
            <p className="alert alert-danger">Only 1 minute remaining</p>
          )}
          <p>{`${min} min ${time}`}</p>
          <h1>
            <u>MCQ Online Examination</u>
          </h1>
          <h5>{`Questions ${count + 1} of ${questions.length}`}</h5>
          <div className="questions">
            <h4>{questions[count].id}.</h4>
            <h4>{questions[count].ques}</h4>
          </div>
          <div className="answers">
            {questions[count].ans.map((answers, i) => {
              return (
                <div className="ans" key={i}>
                  <input
                    type="checkbox"
                    value={answers}
                    name="answers"
                    className=" btn btn-outline-success"
                    onClick={(e) => ansSet(e, i)}
                  />
                  {answers}
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

      {/* {console.log(result)} */}
    </section>
  );
}

export default Questions;
