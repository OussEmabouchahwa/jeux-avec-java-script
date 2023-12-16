// Function to simulate getting input from the user in a web environment
function getUserInput(promptText) {
    return prompt(promptText);
}

// Function to simulate displaying output to the user in a web environment
function displayOutput(outputText) {
    document.getElementById('gameOutput').innerHTML += outputText + '<br>';
}

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

function spin() {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}

function transpose(reels) {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

function printRows(rows) {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        displayOutput(rowString);
    }
}

function getWinnings(rows, bet, lines) {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
}

// Function to simulate the game logic in a web environment
function game() {
    let balance = parseFloat(getUserInput("Enter a deposit amount:"));

    while (true) {
        displayOutput("You have a balance of $" + balance);
        const numberOfLines = parseFloat(getUserInput("Enter the number of lines to bet on (1-3):"));
        const bet = parseFloat(getUserInput("Enter the bet per line:"));
        balance -= bet * numberOfLines;

        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);

        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        displayOutput("You won, $" + winnings.toString());

        if (balance <= 0) {
            displayOutput("You ran out of money!");
            break;
        }

        const playAgain = getUserInput("Do you want to play again (y/n)?");

        if (playAgain.toLowerCase() !== "y") break;
    }
}

// Call the game function when the "Start Game" button is clicked
function startGame() {
    // Clear the game output
    document.getElementById('gameOutput').innerHTML = '';
    // Start the game
    game();
}
