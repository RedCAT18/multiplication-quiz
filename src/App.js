import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const getRandomNum = () => {
    return Math.ceil(Math.random() * 9);
  };

  const [firstNum, setFirstNum] = useState(getRandomNum()); //첫번째 피연산자
  const [secondNum, setSecondNum] = useState(getRandomNum()); //두번째 피연산자
  const [input, setInput] = useState(""); //입력값
  const [mark, setMark] = useState(""); //정답or오답 체크
  const [gameNum, setGameNum] = useState(1); //문제 수
  const [score, setScore] = useState(0); //점수
  const [nextQuiz, setNextQuiz] = useState(false);
  const [resetQuiz, setResetQuiz] = useState(false);

  const handleInput = e => {
    setInput(e.target.value);
  };

  const createRecord = () => {
    //문제를 풀 때 마다 기록

    const recordSpace = document.getElementById("record");
    const prevQuestion = document.createElement("li");
    const quest = document.createElement("span");
    prevQuestion.classList.add("records__list");
    quest.innerText = `${firstNum} * ${secondNum} = ${input}`;
    if (mark === "wrong") {
      quest.style.color = "red";
      quest.style.textDecoration = "line-through";
    }
    prevQuestion.appendChild(quest);
    recordSpace.appendChild(prevQuestion);
  };

  const finishGame = () => {
    //10문제를 모두 풀었을 시 점수가 나오고 새로 문제를 풀 지를 물어본다.

    setInput("");
    if (window.confirm("Restart your quiz?")) {
      //다시 문제를 풀 경우 모두 초기화
      const records = document.getElementById("record");
      records.innerHTML = "";
      setFirstNum(getRandomNum());
      setSecondNum(getRandomNum());
      setMark("");
      setGameNum(1);
      setScore(0);
      setNextQuiz(false);
      setResetQuiz(false);
    }
  };

  const nextGame = () => {
    //성공시 게임 리셋
    createRecord();
    if (gameNum < 10) {
      setGameNum(gameNum + 1);
      setFirstNum(getRandomNum());
      setSecondNum(getRandomNum());
      setInput("");
      setNextQuiz(false);
    } else {
      setMark(`Your score is ${score}/10.`);
      setResetQuiz(true);
    }
  };

  const handleSubmit = e => {
    //입력값이 정답이면 정답기록, 틀리면 오답기록
    e.preventDefault();

    if (nextQuiz) {
      nextGame();
    } else {
      if (input.length !== 0) {
        if (parseInt(input) === firstNum * secondNum) {
          setMark("correct");
          setScore(score + 1);
        } else {
          setMark("wrong");
        }

        setNextQuiz(true);
      }
    }
  };

  const handleClick = () => {
    finishGame();
  };

  return (
    <div id="App">
      <div className="container">
        <div className="question">
          <h1>
            Q{gameNum}. {firstNum} X {secondNum} =?
          </h1>
        </div>
        <form className="answer__form" onSubmit={handleSubmit}>
          <input
            className="input__answer"
            type="number"
            value={input}
            onChange={handleInput}
          />
          <button className="input__submit">
            {nextQuiz ? "Next" : "Input"}
          </button>
        </form>
        <div className="answer__mark">{mark}</div>
        <div className="answer__records">
          <h3>Your Quiz Records</h3>
          <ol id="record" />
        </div>
        {resetQuiz ? (
          <button className="reset__games" onClick={handleClick}>
            Restart?
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
