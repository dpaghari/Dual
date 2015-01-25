function hitButton (player1, player2, button) {
    //  Add and update the score
	if(buttonPressed == false) {
		score += 10;
		scoreText.text = 'Score: ' + score;
	}
	
	buttonPressed = true;
	button.kil();
	button = game.add.sprite(128, game.world.height - 100, 'star');

    console.log ('Hit Button');
}