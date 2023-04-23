import { useState } from "react";

const App = () => {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [nextXO, setNextXO] = useState(true);

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    // вернуть если выиграл, либо всё заполнено
    if (winner || board[index]) return;

    // выбор квадрата
    const boardCopy = [...board];
    boardCopy[index] = nextXO ? "X" : "O";
    setBoard(boardCopy);
    setNextXO(!nextXO);
  };

  const renderStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every(item => item !== null)) {
      return "Draw!";
    } else {
      return `Next player: ${nextXO ? "X" : "O"}`;
    }
  };

  return (
    <>
      <h1> Tic Tac Toe Game </h1>
      <div className="board">
        {board.map((item, index) => (
          <button
            className="item"
            key={index}
            onClick={() => handleClick(index)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="status">{renderStatus()}</div>
      <button className="reset-button" onClick={() => setBoard(emptyBoard)}>
        Restart Game
      </button>
    </>
  );
};

export default App;
