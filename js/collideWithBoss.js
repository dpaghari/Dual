function collideWithBoss (boss, player) {
	//console.log ('Go to Level 2');
    
    if (player == player1 && player1.y > game.world.height - 75) {
		player1HP = 0;
	}
    else if (player == player2 && player2.y > game.world.height - 75) {
		player2HP = 0;
	}
}
