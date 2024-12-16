import { useRef, useState } from "react";
import data from "../data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);

  let [lock, setLock] = useState(false);

  let [score, setScore] = useState(0);

  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let Options_arr = [Option1, Option2, Option3, Option4];

  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((s) => s + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        Options_arr[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  function nextBtn() {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      Options_arr.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
      });
    }
  }
  function reset() {
    setIndex(0);
    setQuestion(data[index]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>
            Your score is {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}.{question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={nextBtn}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
