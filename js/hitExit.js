function hitExit (player, exit) {
	var levelComplete = game.add.audio('levelComplete', .1, false);
	levelComplete.loop = false;
    levelComplete.play();
    levelComplete.totalDuration = .2;

	console.log ('Go to Level 2');
	exit.kill();

    game.state.start('level2');
}