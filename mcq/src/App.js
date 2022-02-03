import "./App.css";
import Questions from "./components/mcq/Questions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./components/Start";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Finished from "./components/mcq/Finished";
function App() {
  const useRedux = useSelector(selectUser);
  const corrAns = useRedux.answer;
  return (
    <div className="App">
      <Router>
        <Routes>
          {!corrAns && <Route exact path="/" element={<Start />} />}
          {corrAns && (
            <Route exact path="/" element={<Finished correctAns={corrAns} />} />
          )}
          <Route exact path="/mcq-exam" element={<Questions />} />
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
