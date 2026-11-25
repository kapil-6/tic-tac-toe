
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick() {
    const index = [...cells].indexOf(this);

    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    this.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent =
            "Player " + currentPlayer + " Wins! 🎉";
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        "Player " + currentPlayer + "'s Turn";
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;

        return (
            gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[b] === gameState[c]
        );
    });
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
    });

    statusText.textContent = "Player X's Turn";
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
