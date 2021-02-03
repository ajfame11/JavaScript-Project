const api = new APIAdapter

// HTML Elemenets
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

//game constants
const xSymbol = '×';
const oSymbol = '○';

//game variables
let gameIsLive = true; //If true then game is going, but if someone won or if a tie then game is not live and will be manually set to false
let xIsNext = true; //If true then its X turn, false then its O turn
let winner = null;

//Function
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol; //Converts 'x' & 'o' to the symbol constant counterparts through the reactor'?'

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if (winner === 'x') { 
        statusDiv.innerHTML = `${letterToSymbol(winner)} has won!`;  //Place here for when 'x' wins, status color stays black
        } else {
        statusDiv.innerHTML = `<span>${letterToSymbol(winner)} has won!</span>`; //Place <span> here for when 'o' wins, status color becomes white
    }
    
}

const checkGameStatus = () => {
    const topleft = cellDivs[0].classList[2];
    const topmiddle = cellDivs[1].classList[2];
    const topright = cellDivs[2].classList[2];
    const middleleft = cellDivs[3].classList[2];
    const middlemiddle = cellDivs[4].classList[2];
    const middleright = cellDivs[5].classList[2];
    const bottomleft = cellDivs[6].classList[2];
    const bottommiddle = cellDivs[7].classList[2];
    const bottomright = cellDivs[8].classList[2];

    //Is there a winner?
    if (topleft && topleft === topmiddle && topleft === topright) { //checks each if statement for either 'x' or 'o' in a row and if theres a win then the handle func will start
        handleWin(topleft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
      } else if (middleleft && middleleft === middlemiddle && middleleft === middleright) {
        handleWin(middleleft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
      } else if (bottomleft && bottomleft === bottommiddle && bottomleft === bottomright) {
        handleWin(bottomleft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
      } else if (topleft && topleft === middleleft && topleft === bottomleft) {
        handleWin(topleft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
      } else if (topmiddle && topmiddle === middlemiddle && topmiddle === bottommiddle) {
        handleWin(topmiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
      } else if (topright && topright === middleright && topright === bottomright) {
        handleWin(topright);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
      } else if (topleft && topleft === middlemiddle && topleft === bottomright) {
        handleWin(topleft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
      } else if (topright && topright === middlemiddle && topright === bottomleft) {
        handleWin(topright);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
      } else if (topleft && topmiddle && topright && middleleft && middlemiddle && middleright && bottomleft && bottommiddle && bottomright) {
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is tied!';
    } else {
        xIsNext = !xIsNext; //Will make (xIsNext) be opposite of current value; Ex: true becomes false
        if (xIsNext) {
            statusDiv.innerHTML = `${xSymbol} is next`;
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }
};

// event handlers
const handleReset = () => { //Will reset the game
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    winner = null;
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
    gameIsLive = true;
};

const handleCellClick = (event) => { //
    const classList = event.target.classList;
    const location = classList[2]; //This is the location of the cell on the board, remove and have 'x' and 'o' as the first index?

    if (!gameIsLive || classList[2] === 'x' || classList[2] === 'o') {
        return;
    }

    if (xIsNext) {  //If (xIsNect) is true, then func will add a class of 'x' 
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }
};

// event listeners
resetDiv.addEventListener('click',handleReset ); //When the reset button is clicked, then the function: handleReset starts

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick) //When the space on the game is clicked, then the function handleCellClick starts
};