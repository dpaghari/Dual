function destroyBullet (player, bullet) {
    
    // Removes the bullet from the screen
    bullet.kill();

    score += 500;
    scoreText.text = 'Score: ' + score;

}