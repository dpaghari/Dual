function hitExit (player, exit) {
	var levelComplete = game.add.audio('levelComplete', .1, false);
	levelComplete.loop = false;
    levelComplete.play();
    levelComplete.totalDuration = .2;

	//console.log ('Go to Level 2');
    
    if (player == player1)
        p1Touched = true;
    else
        p2Touched = true;
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

function blockExit(){
    
    buttonActivated = true;
}

