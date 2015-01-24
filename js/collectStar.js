function collectStar (player, bullet) {
    
    // Removes the star from the screen
    bullet.kill();

    score += 500;
    scoreText.text = 'Score: ' + score;

}