import React from "react";
import Square from "./Square";

export default function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square key={index} value={value} onClick={() => onClick(index)} />
      ))}
    </div>
  );
}
