function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    if(player == player1) {
		player1Score += 10;
	} else {
		player2Score += 10;
	}
}