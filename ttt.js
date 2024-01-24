document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const resultElement = document.getElementById("result");
  const resetButton = document.getElementById("resetButton");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return gameBoard[a];
      }
    }

    return null;
  }

  function checkTie() {
    return gameBoard.every((cell) => cell !== "");
  }

  function handleCellClick(index) {
    if (!gameBoard[index] && gameActive) {
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;

      const winner = checkWinner();
      if (winner) {
        resultElement.textContent = `${winner} wins!`;
        gameActive = false;
      } else if (checkTie()) {
        resultElement.textContent = "It's a tie!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  function handleReset() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    resultElement.textContent = "";
    gameActive = true;
    currentPlayer = "X";
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
  });

  resetButton.addEventListener("click", handleReset);
});
