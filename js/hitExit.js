function hitExit (player, exit) {
	console.log ('Go to Level 2');
	exit.kill();
    game.state.start('level2');
}