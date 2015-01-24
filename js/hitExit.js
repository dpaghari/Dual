function hitExit (exit) {j
	exit.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

    console.log ('Go to Level 2');
}