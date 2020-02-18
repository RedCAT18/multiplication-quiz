import React from "react";

const Record = ({ firstNum, secondNum, input, mark }) => {
  return (
    <li
      className="records__list"
      style={
        mark === "wrong"
          ? { color: "red", textDecoration: "line-through" }
          : null
      }
    >
      <span>
        {firstNum} X {secondNum} = {input}
      </span>
    </li>
  );
};

export default Record;
