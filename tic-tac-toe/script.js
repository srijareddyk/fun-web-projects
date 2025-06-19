const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "🎀";
let running = true;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

startGame();

function startGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `player ${currentPlayer}'s turn✨`;
}

function cellClicked() {
  const index = this.dataset.index;

  if (board[index] !== "" || !running) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `player ${currentPlayer} wins!!✨🌸💗💖`;
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = "it's a draw, you both win!💖✨💖✨";
    running = false;
  } else {
    currentPlayer = currentPlayer === "🎀" ? "🪞" : "🎀";
    statusText.textContent = `player ${currentPlayer}'s turn✨`;
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "🎀";
  running = true;
  statusText.textContent = `player ${currentPlayer}'s turn✨`;
  cells.forEach(cell => cell.textContent = "");
}
