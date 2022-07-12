const cells = document.querySelectorAll(".cell");
const turnStatus = document.querySelector("#turnStatus");
const restartBttn = document.querySelector("#restartBttn");
const players = [player1, player2];
let options = ["", "", "", "", "", "", "", "", ""];
let running = false;
const randomInt = getRandomStartingPlayer(2)
let currentPlayer;
let isX = "X";
initializeGame();

const savePlayer = () =>{
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;
    console.log("player1" + player1);
    console.log("player2" + player2);
     currentPlayer = randomInt == 0 ? players[0].value : players[1].value;
     turnStatus.textContent = (`${currentPlayer} Choose Your Space!`);
}

const winConditions = [
    
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBttn.addEventListener("click", restartGame);
    if (!currentPlayer){
        turnStatus.textContent = (`Enter player names!`);

    }else{
        turnStatus.textContent = (`${currentPlayer} Choose Your Space!`);

    }

    running = true;
}

function getRandomStartingPlayer(max) {
    return Math.floor(Math.random() * max);
  }

  let switchInt = randomInt;
function switchPlayer() {
    if (isX === 'X'){
        isX = 'O'
        switchInt = Math.abs(switchInt -1)
        currentPlayer = players[switchInt].value
    } else {
        isX = 'X'
        switchInt = Math.abs(switchInt -1)
        currentPlayer = players[switchInt].value
    }
    turnStatus.textContent = (`${currentPlayer} Choose Your Space!`);
}

function cellClicked() {
    let cellIdx = this.getAttribute("cellIdx");

    if (options[cellIdx] != "" || !running) {
        return;
    }
    updateCell(this, cellIdx);
    checkForWinner();
}

function updateCell(cell, idx) {
    options[idx] = isX;
    cell.textContent = isX;
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        let condition = winConditions[i];
        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        turnStatus.textContent = (`${currentPlayer} Wins!`);
        running = false;
    }
    else if(!options.includes("")) {
        turnStatus.textContent = 'Wash!';
        running = false;
    }
    else{
        switchPlayer();
    }
}
function restartGame() {
    switchPlayer()
    options = ["", "", "", "", "", "", "", "", ""];
    turnStatus.textContent = (`${currentPlayer} Choose Your Space!`);
    cells.forEach(cell => cell.textContent = "");
    running = true;
}