const tilesMP = document.getElementsByClassName("multi");
let toTakeMP = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let roundMP = 1;

function pickMP(index) {
    if(roundMP === 1) {
        if(toTakeMP[index] === 0) {
            tilesMP[index].src = "./images/circle.png";
            toTakeMP[index] = 1;
        }
        else return;
    }
    else {
        if(toTakeMP[index] === 0) {
            tilesMP[index].src = "./images/cross.png";
            toTakeMP[index] = 2;
        }
        else return;
    }
    if(checkEndGameMP(roundMP) || checkEndGameMP(0)) return;
    roundMP += roundMP === 1 ? 1 : -1;
}

function checkEndGameMP(player) {
    if(player === 0) {
        if(checkTieMP()) {
            endGameMP(0);
            return true;
        }
        else return false;
    }
    else {
        if (checkPlayerWinMP(player)) {
            endGameMP(player);
            return true;
        }
        else return false;
    }
}

function checkPlayerWinMP(player) {
    let win = false;
    for(let index = 0; index < 3; index++) {
        win = win || checkRowMP(player, index) || checkColumnMP(player, index);
    }
    win = win || checkDiagonalMP(player);
    return win
}

function checkTieMP() {
    let tie = true;
    for(let index = 0; index < 9; index++) {
        tie = tie && (toTakeMP[index] !== 0)
    }
    return tie;
}

function endGameMP(player) {
    alert(dialogMessageBuilderMP(player));
    clearMP()
}

function checkRowMP(player, row) {
    let rowId = row * 3;
    return (toTakeMP[rowId] === player && toTakeMP[rowId + 1] === player && toTakeMP[rowId + 2] === player);
}

function checkColumnMP(player, column) {
    return (toTakeMP[column] === player && toTakeMP[column + 3] === player && toTakeMP[column + 6] === player);
}

function checkDiagonalMP(player) {
    return ((toTakeMP[0] === player && toTakeMP[4] === player && toTakeMP[8] === player) || (toTakeMP[2] === player && toTakeMP[4] === player && toTakeMP[6] === player));
}

function dialogMessageBuilderMP(player) {
    switch (player) {
        case 0:
            return "TIE!";
        case 1:
            return "CIRCLE WON!";
        case 2:
            return "CROSS WON!";
        default:
            return "SOMETHING WENT WRONG"
    }
}

function clearMP() {
    toTakeMP = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    roundMP = 1;
    for(let index = 0; index < 9; index++) {
        tilesMP[index].setAttribute("src", "./images/clear.png");
    }
}