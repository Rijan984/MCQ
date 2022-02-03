import React from "react";
import { useNavigate } from "react-router-dom";

function AlreadyGiven() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>You already attend Exam</h1>
      <button className="btn btn-success" onClick={() => navigate("/result")}>
        See Result
      </button>
    </div>
  );
}

export default AlreadyGiven;
