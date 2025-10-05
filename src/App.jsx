import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./utils/calculateWinner";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Load scoreboard from localStorage or initialize
  const [score, setScore] = useState(() => {
    const stored = localStorage.getItem("ticScore");
    return stored
      ? JSON.parse(stored)
      : { X: 0, O: 0, draws: 0 };
  });

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ticScore", JSON.stringify(score));
  }, [score]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScore((prev) => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const newRound = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  const resetAll = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
    setScore({ X: 0, O: 0, draws: 0 });
    localStorage.removeItem("ticScore");
  };

  return (
    <div className="app">
      <h1 className="title">🎮 Tic Tac Toe</h1>

      <div className="game-container">
        <Board squares={board} onClick={handleClick} />

        <div className="scoreboard">
          <h2>Scoreboard</h2>
          <p>✅ X Wins: {score.X}</p>
          <p>⭕ O Wins: {score.O}</p>
          <p>➖ Draws: {score.draws}</p>
        </div>
      </div>

      <div className="info">
        {winner ? (
          <h2>🏆 {winner === "Draw" ? "Draw!" : `Winner: ${winner}`}</h2>
        ) : (
          <h2>Next Player: {xIsNext ? "X" : "O"}</h2>
        )}
        <button className="reset-btn" onClick={newRound}>
          🔁 New Round
        </button>
        <button className="reset-btn" onClick={resetAll}>
          🧹 Reset All
        </button>
      </div>
    </div>
  );
}
