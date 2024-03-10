const tilesSP = document.getElementsByClassName("single");
let toTakeSP = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function pickSP(index) {
    if(toTakeSP[index] === 0) {
        tilesSP[index].setAttribute("src", "./images/circle.png");
        toTakeSP[index] = 1;
    }
    else return;
    if(checkEndGameSP(1) || checkEndGameSP(0)) return;

    let aiIndex = generateAiIndexSP();
    tilesSP[aiIndex].setAttribute("src", "./images/cross.png");
    toTakeSP[aiIndex] = 2;
    checkEndGameSP(2);
    checkEndGameSP(0);
}

function generateAiIndexSP() {
    let index = -1;
    do {
        index = Math.round(Math.random() * 8);
    }while (toTakeSP[index] !== 0);
    return index
}

function checkEndGameSP(player) {
    if(player === 0) {
        if(checkTieSP()) {
            endGameSP(0);
            return true;
        }
        else return false;
    }
    else {
        if (checkPlayerWinSP(player)) {
            endGameSP(player);
            return true;
        }
        else return false;
    }
}

function checkPlayerWinSP(player) {
    let win = false;
    for(let index = 0; index < 3; index++) {
        win = win || checkRowSP(player, index) || checkColumnSP(player, index);
    }
    win = win || checkDiagonalSP(player);
    return win
}

function checkTieSP() {
    let tie = true;
    for(let index = 0; index < 9; index++) {
        tie = tie && (toTakeSP[index] !== 0)
    }
    return tie;
}

function endGameSP(player) {
    alert(dialogMessageBuilderSP(player));
    clearSP()
}

function checkRowSP(player, row) {
    let rowId = row * 3;
    return (toTakeSP[rowId] === player && toTakeSP[rowId + 1] === player && toTakeSP[rowId + 2] === player);
}

function checkColumnSP(player, column) {
    return (toTakeSP[column] === player && toTakeSP[column + 3] === player && toTakeSP[column + 6] === player);
}

function checkDiagonalSP(player) {
    return ((toTakeSP[0] === player && toTakeSP[4] === player && toTakeSP[8] === player) || (toTakeSP[2] === player && toTakeSP[4] === player && toTakeSP[6] === player));
}

function dialogMessageBuilderSP(player) {
    switch (player) {
        case 0:
            return "TIE!";
        case 1:
            return "YOU WON!";
        case 2:
            return "YOU LOST!";
        default:
            return "SOMETHING WENT WRONG"
    }
}

function clearSP() {
    toTakeSP = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(let index = 0; index < 9; index++) {
        tilesSP[index].setAttribute("src", "./images/clear.png");
    }
}
