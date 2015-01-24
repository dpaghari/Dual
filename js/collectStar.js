function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    score += 500;
    scoreText.text = 'Score: ' + score;

}