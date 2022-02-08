import { useState } from "react";
import "./App.css";
import Questions from "./components/mcq/Questions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./components/Start";
import ErrorPage from "./components/ErrorPage";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Finished from "./components/mcq/Finished";
import AlreadyGiven from "./components/AlreadyGiven";
function App() {
  const [btnResult, setBtn] = useState(false);
  const useRedux = useSelector(selectUser);
  const corrAns = useRedux.answer;
  return (
    <div className="App">
      <Router>
        <Routes>
          {!corrAns && <Route exact path="/" element={<Start />} />}
          {corrAns && <Route exact path="/" element={<AlreadyGiven />} />}

          {/* <Route exact path="/mcq-exam" element={<Questions />} /> */}
          {corrAns && (
            <Route
              exact
              path="/result"
              element={<Finished correctAns={corrAns} />}
            />
          )}
          <Route exact path="*" element={<Start />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
