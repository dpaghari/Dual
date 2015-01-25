function hitExit (player, exit) {
	console.log ('Go to Level 2');
    if (player == player1)
        p1Touched = true;
    else
        p2Touched = true;
	timeCheck = game.time.now;
}

function touchedExit (player, exit) {
    if (player == player1) {
        if (p1Touched == true)
            return false;
    }
    else {
        if (p2Touched == true)
            return false;
    }
}