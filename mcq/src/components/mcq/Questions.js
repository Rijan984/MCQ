import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ans,
  ansCheckbox,
  selectUser,
  selectUserCheck,
} from "../../features/userSlice";

import Finished from "./Finished";
import { questions } from "./question";
import "./questions.css";
import { ansFile } from "./question";

function Questions() {
  let [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [anss, setAnss] = useState({});
  const [anss1, setAnss1] = useState([]);
  const [check, setCheck] = useState(false);
  const [nxtFin, setNxtFin] = useState(false);
  // const radiosWrapper = useRef();
  // const [result, setResult] = useState("");
  const [time, setTime] = useState(60);
  const [min, setMin] = useState(5);
  const [warn, setWarn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [indexVal, setindexVal] = useState();
  const [selectFile, setSelectFile] = useState(false);
  const [files, setFile] = useState();
  const [multiple, setMultiple] = useState({});
  const [arr, setArr] = useState([]);
  const useRedux = useSelector(selectUserCheck);
  const corrAns = useRedux.checkBox;

  // const [checks, setChecks] = useState(false);

  useEffect(() => {
    function Timerss() {
      let timer = 60;

      const timerInterval = setInterval(() => {
        timer = timer - 1;
        // const min = timer / 60;
        if (timer < 0) {
          timer = 60;
          setMin(min - 1);
        }
        setTime(timer);
        // console.log(timer);
        if (min === 0 && timer <= 0) {
          clearInterval(timerInterval);
          console.log("hey");
        }
        if (min === 0 && timer === 0) {
          setCheck(true);
          dispatch(
            ans({
              answer: anss,
            })
          );
          navigate("/result");
        }
      }, 1000);

      if (min === 0) {
        setWarn(true);
      }
    }
    // let chks = document.querySelectorAll("input");

    // for (var i = 0; i < chks.length; i++) {
    //   chks[i].onclick = function () {
    //     for (var i = 0; i < chks.length; i++) {
    //       if (chks[i] !== this && this.checked) {
    //         chks[i].checked = false;
    //       }
    //     }
    //   };
    // }

    Timerss();
  }, [min, navigate, dispatch]);
  useEffect(() => {
    // setAnss1({ ...anss1, [count]: arr });
    // console.log(anss1[count][0]);
    // console.log(corrAns[count][0]);
    // setAnss({ ...anss, [count]: multiple });
    dispatch(
      ansCheckbox({
        checkBox: anss1,
      })
    );

    console.log(corrAns);
  }, [multiple, anss1, corrAns, dispatch]);

  const nextQues = (e) => {
    e.preventDefault();

    // console.log(selectFile);
    let unCheck = document.querySelectorAll("input");
    let sss = [];
    for (let i = 0; i < unCheck.length; i++) {
      if (unCheck[i].checked === true) {
        // console.log(unCheck[i].value);
        // setArr([...arr, unCheck[i].value]);
        sss.push(unCheck[i].value);
      }
    }
    setAnss1({ ...anss1, [count]: sss });
    // console.log(anss1[count][0]);
    setArr(sss);
    console.log(anss1);
    // setAnss1({ ...anss1, [count]: multiple });

    // console.log("sssssss", sss);
    // setSelectFile("");

    // console.log(count + 1, corrAns[count + 1][0]);

    setCount(count + 1);
    setDisabled(false);
    // setAnss(, anss1]);
    if (count >= questions.length - 2) {
      setNxtFin(true);
    }
    for (let i = 0; i < unCheck.length; i++) {
      unCheck[i].checked = false;
    }
    // console.log(anss);
    setTimeout(() => {
      // if (corrAns === null) {
      //   console.log("fail");
      // } else {
      for (let i = 0; i < unCheck.length; i++) {
        if (corrAns[count + 1]) {
          if (corrAns[count + 1].includes(unCheck[i].value)) {
            unCheck[i].checked = true;
            console.log(corrAns[count + 1][i]);
          } else {
            unCheck[i].checked = false;
          }
        }
      }
      // }
    });
    // setTimeout(() => {
    //   for (let i = 0; i < unCheck.length; i++) {
    //     if (corrAns) {
    //       if (corrAns.includes(unCheck[i].value)) {
    //         unCheck[i].checked = true;
    //       } else {
    //         // unCheck[i].checked = false;
    //       }
    //     } else {
    //     }
    //   }
    // });
    // console.log(anss1);
    // console.log(multiple);
  };

  const ansSet = (e, i) => {
    // console.log(questions.length);
    let unCheck = document.querySelectorAll("input");
    const { value } = e.target;
    // var checkVal = {};
    // var ss = [];

    setMultiple({ ...multiple, [i]: value });
    // console.log(multiple);
    setAnss({ ...anss, [count]: value });
    // setAnss1({ ...anss1, [count]: multiple });

    // for (let i = 0; i < unCheck.length; i++) {
    //   if (unCheck[i].checked === true) {
    //     setAnss1([...anss1, unCheck[i].value]);
    //   } else {
    //     unCheck[i].checked = false;
    //   }
    // }
    let ind = i;
    setindexVal(ind);
    for (let i = 0; i < unCheck.length; i++) {
      if (unCheck[i].checked !== true) {
        unCheck[i].checked = false;
      } else {
        unCheck[i].checked = true;
      }
    }
  };

  const prevQues = (e) => {
    e.preventDefault();
    let unCheck = document.querySelectorAll("input");
    setCount(count - 1);
    // console.log("ss", corrAns[count - 1]);
    // console.log(corrAns[count - 1]);
    setNxtFin(false);
    // console.log(count);
    if (count <= 1) {
      setDisabled(true);
      setNextDisabled(false);
    }
    if (count < questions.length) {
      setNextDisabled(false);
    }
    setTimeout(() => {
      for (let i = 0; i < unCheck.length; i++) {
        console.log(corrAns[count - 1][i], unCheck[i].value);
        if (corrAns !== []) {
          if (corrAns[count - 1].includes(unCheck[i].value)) {
            unCheck[i].checked = true;
            console.log("checked");
          } else {
            unCheck[i].checked = false;
          }
        }
      }
    }, 5);
    // setTimeout(() => {
    //   for (let i = 0; i < unCheck.length; i++) {
    //     if (corrAns.includes(unCheck[i].value)) {
    //       unCheck[i].checked = true;
    //     } else {
    //       unCheck[i].checked = false;
    //     }
    //   }
    // });
  };
  const corr = questions.map(({ corrAns }) => corrAns);
  const corrAnss = () => {
    const formData = new FormData();
    formData.append("File", files);

    if (files) {
      setSelectFile(false);
      dispatch(
        ans({
          answer: anss1,
        })
      );
      dispatch(
        ansCheckbox({
          checkBox: null,
        })
      );
      navigate("/result");
    } else {
      setSelectFile(true);
    }
  };
  return (
    <section className="main">
      {/* <Timer countdownTimestampMs={1643673600000} /> */}
      {check || (
        <div className="main-ques">
          {warn && (
            <p className="alert alert-danger">Only 1 minute remaining</p>
          )}
          <p>{`${min} min ${time} sec`}</p>
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
                    id="mycheck"
                    value={answers}
                    name={`${count}`}
                    // name="answers"
                    className=" btn btn-outlinbe-success"
                    onClick={(e) => ansSet(e, i)}
                  />
                  {answers}
                  {/* </input> */}
                </div>
              );
            })}
          </div>
          {count > questions.length - 2 && (
            <div style={{ marginTop: "5%" }}>
              {ansFile.map((questions) => {
                const { id, file, ques } = questions;
                return (
                  <section key={id}>
                    <h4>{`=>`} Submit the answer in document.(5mark)</h4>

                    <div className="questions">
                      <h4>{ques}</h4>
                    </div>
                    <input
                      type="file"
                      style={{ marginTop: "2%" }}
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setSelectFile(false);
                      }}
                    />

                    {selectFile && (
                      <p style={{ color: "red" }}>Please choose file.</p>
                    )}
                  </section>
                );
              })}
            </div>
          )}

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
                  // setCheck(true);
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
      {check && <Finished correctAns={anss1} />}
      {/* {console.log(result)} */}
    </section>
  );
}

export default Questions;
