function destroyBullet (player, bullet) {
    
    // Removes the bullet from the screen
    bullet.kill();

    if(player == player1) {
		player2Score += 10;
	} else {
		player1Score += 10;
	}

}