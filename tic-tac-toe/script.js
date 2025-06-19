const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const modeOptions = document.querySelectorAll('input[name="mode"]');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "🎀";
let running = true;
let mode = "2p"; 

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

startGame();

function startGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  modeOptions.forEach(opt => opt.addEventListener('change', changeMode));
  statusText.textContent = `player ${currentPlayer}'s turn✨`;
}

function changeMode(e) {
  mode = e.target.value;
  restartGame();
}

function cellClicked() {
  const index = this.dataset.index;

  if (board[index] !== "" || !running) return;

  makeMove(index, currentPlayer);
  checkWinner();

  if (running && mode === "bot" && currentPlayer === "🪞") {
    setTimeout(() => {
      const bestMove = getBestMove();
      makeMove(bestMove, "🪞");
      checkWinner();
    }, 300); 
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function checkWinner() {
  let won = false;

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      won = true;
      break;
    }
  }

  if (won) {
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

function getBestMove() {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "🪞";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(newBoard, depth, isMaximizing) {
  let result = evaluate(newBoard);
  if (result !== null) return result;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "🪞";
        let score = minimax(newBoard, depth + 1, false);
        newBoard[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "🎀";
        let score = minimax(newBoard, depth + 1, true);
        newBoard[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function evaluate(board) {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] === "O" ? 1 : -1;
    }
  }

  if (!board.includes("")) {
    return 0; 
  }

  return null; 
}
