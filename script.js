const WINS_ARRAY = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let gameOver = false;

const grid = document.getElementById('grid');

const playerFactory = (name, piece) => ({ name, piece });

const game = (() => {
  const board = Array(9).fill('');
  const player1 = playerFactory('Jerry', 'X');
  const player2 = playerFactory('Tom', 'O');
  const currentPlayer = player1;

  return {
    board,
    player1,
    player2,
    currentPlayer,
  };
})();

function makeMove(index, piece) {
  const slot = grid.children.item(index);
  if (slot.textContent === '') {
    game.board[index] = piece;

    const color = piece === 'X' ? 'blue' : 'red';
    slot.setAttribute('color', color);
    slot.textContent = piece;

    return 'ok';
  }
  return null;
}

function isWon(board, piece) {
  for (const win of WINS_ARRAY) {
    let total = 0;
    for (const slot of win) {
      if (board[slot - 1] === piece) {
        total += 1;
      }
    }
    if (total === 3) return true;
  }
  return false;
}

function displayWinner(name) {
  const winner = document.getElementById('winner');
  winner.style.visibility = 'visible';
  winner.textContent = `${name} won!`;
}

function endGame(name) {
  gameOver = true;
  displayWinner(name);
}

function isTie(board) {
  return !board.some((slot) => slot === '');
}

function click(index) {
  if (gameOver) return;
  if (makeMove(index, game.currentPlayer.piece) == null) return;

  if (isWon(game.board, game.currentPlayer.piece)) {
    endGame(game.currentPlayer.name);
    return;
  }
  if (isTie(game.board)) {
    endGame('No one');
    return;
  }

  game.currentPlayer = game.currentPlayer === game.player1 ? game.player2 : game.player1;
}

function createSlots() {
  grid.innerHTML = '';
  for (let index = 0; index < 9; index += 1) {
    const box = document.createElement('div');
    box.addEventListener('click', click.bind(this, index));

    grid.appendChild(box);
  }
}

function clearBoard() {
  game.board = game.board.map(() => '');
}

function newGame() {
  gameOver = false;
  console.log('here');
  clearBoard();
  createSlots();
  game.currentPlayer = game.player1;
  document.getElementById('winner').style.visibility = 'hidden';
}

const buttonNewGame = document.getElementById('newgame');
buttonNewGame.addEventListener('click', newGame.bind(this));

newGame();
