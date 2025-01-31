import React, { useState } from "react";
import { Button, TextField, Card } from "@mui/material";

const SIZE = 9;

const isValidSudoku = (board) => {
  const rows = Array.from({ length: SIZE }, () => new Set());
  const cols = Array.from({ length: SIZE }, () => new Set());
  const boxes = Array.from({ length: SIZE }, () => new Set());

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const val = board[r][c];
      if (val === "") continue;
      const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIndex].has(val)) {
        return false;
      }
      rows[r].add(val);
      cols[c].add(val);
      boxes[boxIndex].add(val);
    }
  }
  return true;
};

const solveSudoku = (board) => {
  const solve = () => {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] === "") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, r, c, num.toString())) {
              board[r][c] = num.toString();
              if (solve()) return true;
              board[r][c] = "";
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  solve();
};

const isValid = (board, row, col, num) => {
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
    const boxCol = Math.floor(col / 3) * 3 + (i % 3);
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
};

const SudokuSolver = () => {
  const [board, setBoard] = useState(Array.from({ length: SIZE }, () => Array(SIZE).fill("")));
  const [error, setError] = useState("");
  const [hint, setHint] = useState(null);
  const handleChange = (r, c, value) => {
    if (value === "" || (/^[1-9]$/.test(value))) {
      const newBoard = board.map((row) => [...row]);
      newBoard[r][c] = value;
      setBoard(newBoard);
    }
  };

  const validateBoard = () => {
    if (isValidSudoku(board)) {
      setError("");
      return true;
    }
    setError("Invalid Sudoku configuration!");
    return false;
  };

  const handleSolve = () => {
    if (validateBoard()) {
      const solvedBoard = board.map(row => [...row]);
      solveSudoku(solvedBoard);
      setBoard(solvedBoard);
    }
  };

  const getHint = () => {
   
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] === "") {
         
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, r, c, num.toString())) {
             
              setHint({ row: r, col: c, value: num.toString() });
              return;
            }
          }
        }
      }
    }
    
    setHint(null);
  };

  return (
    <Card className="p-4 w-full max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold text-center mb-4">Sudoku Solver</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {hint && <p className="text-green-500 text-center">Hint: Cell ({hint.row + 1}, {hint.col + 1}) → {hint.value}</p>}
      <div
        className="grid grid-cols-9 gap-1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)", 
          gridTemplateRows: "repeat(9, 1fr)", 
          gap: "4px", 
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <TextField
              key={`${r}-${c}`}
              className="w-full h-full text-center"
              value={cell}
              onChange={(e) => handleChange(r, c, e.target.value)}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              variant="outlined"
              size="small"
              style={{
                borderLeft: (c % 3 === 0 && c !== 0) ? "3px solid #000" : "",
                borderTop: (r % 3 === 0 && r !== 0) ? "3px solid #000" : "",
                borderRight: (c % 3 === 2) ? "3px solid #000" : "",
                borderBottom: (r % 3 === 2) ? "3px solid #000" : "",
                backgroundColor: hint && hint.row === r && hint.col === c ? "#e0f7fa" : "", 
              }}
            />
          ))
        )}
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={validateBoard} className="bg-blue-500 text-white px-4 py-2 rounded">
          Validate
        </Button>
        <Button onClick={handleSolve} className="bg-green-500 text-white px-4 py-2 rounded">
          Solve
        </Button>
        <Button onClick={getHint} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Get Hint
        </Button>
      </div>
    </Card>
  );
};

export default SudokuSolver;
