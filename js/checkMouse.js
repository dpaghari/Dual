function checkMouse() {
	var mouse = game.input.keyboard.addKey(Phaser.mousePointer);

	if (game.input.mouse.isDown()) {
        console.log("Mouse X when you clicked was: "+game.input.mouse.x);
	}
}
