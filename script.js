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
                slot.textContent = piece;
        }
}

function isGameOver() {
        return false;
}

function displayWinner() {
        const winner = document.getElementById('winner');
        winner.textContent = `${game.currentPlayer.name} won!`;
}

function endGame() {
        displayWinner();
        // show new game button
        //
}

function click(index) {
        makeMove(index, game.currentPlayer.piece);

        if (isGameOver()) {
                endGame();
                return;
        }

        game.currentPlayer = game.currentPlayer === game.player1 ? game.player2 : game.player1;
}

function createSlots(board) {
        grid.innerHTML = '';
        for (let index = 0; index < 9; index += 1) {
                const box = document.createElement('div');
                box.textContent = board[index];
                box.addEventListener('click', click.bind(this, index));

                grid.appendChild(box);
        }
}

createSlots(game.board);
