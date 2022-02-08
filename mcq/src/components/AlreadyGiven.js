import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ans, selectUser } from "../features/userSlice";

function AlreadyGiven() {
  const navigate = useNavigate();
  const userRedux = useSelector(selectUser);
  const userAns = userRedux.answer;
  const dispatch = useDispatch();
  return (
    <div className="result">
      <h1>You already attend Exam</h1>
      <button className="btn btn-success" onClick={() => navigate("/result")}>
        See Result
      </button>
      <button
        className="btn btn-success"
        onClick={() => {
          dispatch(
            ans({
              answer: null,
            })
          );
          navigate("/MCQ");
        }}
      >
        Attend Again
      </button>
    </div>
  );
}

export default AlreadyGiven;
