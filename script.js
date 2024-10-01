document.addEventListener("DOMContentLoaded", () => {
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;
    const statusDisplay = document.getElementById('gameStatus');
    const strikeLine = document.getElementById("strikeLine");

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.id);

        if (board[clickedCellIndex] !== "" || !isGameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        let winningCombination = [];

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                winningCombination = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
            drawStrikeLine(winningCombination);
            return;
        }

        if (!board.includes("")) {
            statusDisplay.textContent = `It's a draw!`;
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    function drawStrikeLine(winningCombination) {
        const [a, , c] = winningCombination;
        const firstCell = document.getElementById(a).getBoundingClientRect();
        const lastCell = document.getElementById(c).getBoundingClientRect();
        const boardRect = document.getElementById('board').getBoundingClientRect();

        const startX = firstCell.left - boardRect.left + 50;
        const startY = firstCell.top - boardRect.top + 50;
        const endX = lastCell.left - boardRect.left + 50;
        const endY = lastCell.top - boardRect.top + 50;

        const length = Math.hypot(endX - startX, endY - startY);
        const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

        strikeLine.style.width = `${length}px`;
        strikeLine.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg) scaleX(1)`;
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        isGameActive = true;
        statusDisplay.textContent = `Player X's turn`;

        document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
        strikeLine.style.transform = `scaleX(0)`;
    }

    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    document.getElementById("resetBtn").addEventListener("click", resetGame);
});
