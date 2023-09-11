import React, { useState, useEffect } from "react";
import "./Node.css";
import { isBombActive } from "../PathfindingVisualizerFunctionalComponent";
import { grid } from "../PathfindingVisualizerFunctionalComponent";

let mouseIsPressed = false;
let startMouseIsPressed = false;
let finishMouseIsPressed = false;
let bombMouseIsPressed = false;
let bombRow = 0;
let bombCol = 0;

const Node = ({
  row,
  col,
  isFinish,
  isStart,
  isWall,
  isBomb,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onMouseLeave,
}) => {
  const [wall, setWall] = useState(isWall);
  const [start, setStart] = useState(isStart);
  const [finish, setFinish] = useState(isFinish);
  const [bomb, setBomb] = useState(isBomb);

  useEffect(() => {
    if (row === bombRow && col === bombCol && !isBombActive) setBomb(false);
    else setBomb(isBomb);
  }, [col, row, isBomb, isWall]);

  const changeNode = () => {
    if (!start && !finish && !isBomb && mouseIsPressed) {
      setWall(!wall);
    }
  };

  const changeStart = () => {
    if (startMouseIsPressed && !finish && !bomb) {
      setStart(!start);
      className = "node";
    }
  };

  const changeFinish = () => {
    if (finishMouseIsPressed && !start) {
      setFinish(!finish);
    }
  };

  const changeBomb = () => {
    if (bombMouseIsPressed) {
      setBomb(!bomb);
      className = "node";
      bombRow = row;
      bombCol = col;
    }
  };

  const delteMouse = () => {
    startMouseIsPressed = false;

    finishMouseIsPressed = false;

    bombMouseIsPressed = false;

    mouseIsPressed = false;
  };

  const changeMouseIsPressed = () => {
    if (start) {
      startMouseIsPressed = !startMouseIsPressed;
    } else if (finish) {
      finishMouseIsPressed = !finishMouseIsPressed;
    } else if (bomb) {
      bombMouseIsPressed = !bombMouseIsPressed;
    } else {
      mouseIsPressed = !mouseIsPressed;
    }
  };

  let className = "node";

  return (
    <div
      className={className}
      id={`node-${row}-${col}`}
      onMouseDown={() => {
        onMouseDown(row, col, grid[row][col].isStart, finish, bomb);
        changeMouseIsPressed();
        changeNode();
      }}
      onMouseEnter={() => {
        onMouseEnter(row, col, grid[row][col].isStart, finish, bomb);
        changeNode();
        changeStart();
        changeFinish();
        changeBomb();
      }}
      onMouseLeave={() => {
        onMouseLeave(row, col);
        changeStart();
        changeFinish();
        changeBomb();
      }}
      onMouseUp={() => {
        onMouseUp(row, col);
        delteMouse();
      }}
    ></div>
  );
};

export default Node;
