function hitBoss (boss, bullet) {
    
    // Removes the bullet from the screen
    bullet.kill();
	bossHP -= 1;
	//boss.body.velocity.y += 20;
	/*
    if(bullet == p1bullets) {
		player1Score += 1;
	} else {
		player2Score += 1;
	}
	*/

}