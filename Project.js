const prompt = require("prompt-sync")();

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");

        const numeroDepose = parseFloat(depositAmount);

        if (isNaN(numeroDepose) || numeroDepose <= 0) {
            console.log("Invalid number, please try again.");
        } else {
            return numeroDepose;
        }
    }
};

const getNumeroLigne = () => {
    while (true) {
        const ligne = prompt("Enter numero de ligne (1 to 3): ");
        const numeroLigne = parseFloat(ligne);

        if (isNaN(numeroLigne) || numeroLigne <= 0 || numeroLigne > 3) {
            console.log("Invalid number, please try again.");
        } else {
            return numeroLigne;
        }
    }
};

const getBet = (userDeposit, numeroLigne) => {
    while (true) {
        const bet = prompt(`Enter numero de bet (1 to ${userDeposit}): `);
        const numeroBet = parseFloat(bet);

        if (isNaN(numeroBet) || numeroBet <= 0 || numeroBet > userDeposit || numeroBet > numeroLigne) {
            console.log("Invalid number, please try again.");
        } else {
            return numeroBet;
        }
    }
};

let userDeposit = deposit();
const numeroLigne = getNumeroLigne();
const userBet = getBet(userDeposit, numeroLigne);

console.log("User deposited:", userDeposit);
console.log("User selected line:", numeroLigne);
console.log("User's bet:", userBet);
