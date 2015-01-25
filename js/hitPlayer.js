function hitPlayer (player, bullet) {
    
	bullet.kill();
    // Removes the bullet from the screen
    if(player == player1) {
		player1HP -= 1;
	} else {
		player2HP -= 1;
	}

    console.log('player hit!');
}