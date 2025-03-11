// DOM ELEMENTS

const squareOne = document.getElementById("grid__square-1");
const squareTwo = document.getElementById("grid__square-2");
const squareThree = document.getElementById("grid__square-3");
const squareFour = document.getElementById("grid__square-4");
const squareFive= document.getElementById("grid__square-5");
const squareSix= document.getElementById("grid__square-6");
const squareSeven = document.getElementById("grid__square-7");
const squareEight= document.getElementById("grid__square-8");
const squareNine = document.getElementById("grid__square-9");

const allSquares = document.querySelectorAll(".grid__square");

const playerOneScore = document.getElementById("info__player__score1");
const playerTwoScore = document.getElementById("info__player__score2");

const infoText = document.getElementById("instructions__text");
const startGameBtn = document.getElementById("instructions__btn");

const modal = document.getElementById("modal");

// VARIABLES

const players = { // const is used to define an object that cannot be changed
    playerOne: { name: "Jack", wins: 0},
    playerTwo: { name: "Jill", wins: 0}
} 

let move = 1; // let is used to define a variable that can be changed
//  the move variable will be used to determine which player's turn it is. After move 1 is completed, move will be set to 2 and than move 3 and so on. indicating to us who's turn it should be.

let nextPlayer = players.playerOne.name // this variable will be used to display the name of the player whose turn it is
let pastPlayer;
let currentImage = "cross"; // this variable will be used to determine which image to display on the grid

let playerHasWon = false; // this variable will be used to determine if a player has won the game. We define it as false because no player has won the game at the start, It will be set to true if a player has won the game

// SQUARE CLICK FUNCTION

function addSquareClick() {
    allSquares.forEach((square) => {
        square.addEventListener("click", squareClick)
    });
}

function removeSquareClick() {
    allSquares.forEach((square) => {
        square.removeEventListener("click", squareClick)
    });
}

function squareClick() {
    if (!this.classList.contains("cross") && !this.classList.contains("circle")) {
        this.classList.add(`${currentImage}`);
        incrementMove();
    }
}


// INCREMENT MOVE FUNCTION

function incrementMove() {
    move += 1; 
    if (move % 2 !== 0) { // we used the modulo operator to determine if the move is odd or even. If the move is odd, it is player one's turn. If the move is even, it is player two's turn
        nextPlayer = players.playerOne.name;
        pastPlayer = players.playerTwo.name;
        currentImage = "cross";
        infoText.innerHTML = `${players.playerOne.name}s turn`; // we used the innerHTML property to change the text content of the infoText element directly in the HTML
    } else {
    nextPlayer = players.playerTwo.name;
    pastPlayer = players.playerOne.name;
    currentImage = "circle";
    infoText.innerHTML = `${players.playerTwo.name}s turn`;
    }

    checkForWin();
    checkForTie();
}

function checkForWin() {
    const lines = [
        [squareOne, squareTwo, squareThree],
        [squareFour, squareFive, squareSix],
        [squareSeven, squareEight, squareNine],
        [squareOne, squareFour, squareSeven],
        [squareTwo, squareFive, squareEight],
        [squareThree, squareSix, squareNine],
        [squareOne, squareFive, squareNine],
        [squareThree, squareFive, squareSeven]
    ]
    for (const line of lines) {
        const hasCross = line.every((square) => 
            square.classList.contains("cross")
        );
        const hasCircle = line.every((square) => 
            square.classList.contains("circle")
        );
        if (hasCross || hasCircle) {
            const winner = hasCross ? players.playerOne : players.playerTwo;
            winner.wins += 1;
            updateScores();
            playerWon();
            return;
        }
    }
}

function updateScores() {
    playerOneScore.innerHTML = players.playerOne.wins;
    playerTwoScore.innerHTML = players.playerTwo.wins;
}

function playerWon() {
    infoText.innerHTML = `${pastPlayer} won!`;
    playerHasWon = true;
    continueGame();
}

// CHECK FOR TIE

function checkForTie() {
    const squares = [
        squareOne,
        squareTwo,
        squareThree,
        squareFour,
        squareFive,
        squareSix,
        squareSeven,
        squareEight,
        squareNine,
    ];
    const allSquaresFilled = squares.every((square) => {
        return ( 
            square.classList.contains("cross") || square.classList.contains("circle")
        );
    });
    
    if (allSquaresFilled && !playerHasWon) {
        infoText.innerHTML = "It's a tie!";
        continueGame();
    }
}

//  CONTINUE / RESTART / RESET

function continueGame() {
    removeSquareClick();
    setTimeout(() => {
        reset();
    },  2000);
}

function restartGame() {
    removeSquareClick();
    reset();
}

function reset() {
    allSquares.forEach((square) => {
        square.classList = "grid__square";
    });
    addSquareClick();
    playerHasWon = false;
    infoText.innerHTML = `${nextPlayer}'s turn to start`;
}

// START GAME

function startGame() {
    startGameBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const player1Input = document.getElementById("player1").value.trim().toLowerCase();
        const player2Input = document.getElementById("player2").value.trim().toLowerCase();
    
        const player1InputCap = player1Input.charAt(0).toUpperCase() + player1Input.slice(1);
        const player2InputCap = player2Input.charAt(0).toUpperCase() + player2Input.slice(1);

        players.playerOne.name = player1InputCap;
        players.playerTwo.name = player2InputCap;
        nextPlayer = player1InputCap;

        document.getElementById("info__player__name1").innerHTML = 
            players.playerOne.name;
        document.getElementById("info__player__name2").innerHTML = 
            players.playerTwo.name;

        players.playerOne.wins = 0;
        players.playerTwo.wins = 0;
        updateScores();

        infoText.innerHTML = `${players.playerOne.name}'s turn to start`;
        modal.style.display = "none";

        startGameBtn.innerHTML = "Restart Game";
        addSquareClick();
        restartGame();
    });
}

startGame();


// HAMBURGER MENU

const menuIcon = document.querySelector(".hamburger-menu");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("change");
});