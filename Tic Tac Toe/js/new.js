const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const winningGif = document.getElementById('winningGif');
let currentPlayer = 'X';
let gameEnded = false;  // Flag to check if the game has ended

function handleClick(event) {
    if (gameEnded) return;  // Exit the function if the game has ended

    const cell = event.target;
    const isCellFilled = cell.textContent.trim() !== '';
    if (isCellFilled) return;
    
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        statusText.textContent = `${currentPlayer} wins!`;
        highlightWinningCells(currentPlayer);  // Highlight the winning cells
        winningGif.classList.remove('hidden');  // Show the winning GIF
        gameEnded = true;  // Set the gameEnded flag to true
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winConditions.some(condition => {
        return condition.every(index => {
            return cells[index].textContent.trim() === player;
        });
    });
}

function highlightWinningCells(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    winConditions.forEach(condition => {
        if (condition.every(index => cells[index].textContent.trim() === player)) {
            condition.forEach(index => {
                cells[index].classList.add('winner');  // Add 'winner' class to the winning cells
            });
        }
    });
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');  // Remove 'winner' class from all cells
    });
    currentPlayer = 'X';
    statusText.textContent = "Player X's turn";
    gameEnded = false;  // Reset the gameEnded flag
    winningGif.classList.add('hidden');  // Hide the winning GIF
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
