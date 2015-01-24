function moveChar(){

	// Player 1 Movement
	
	var Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	var Akey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	var Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	var Dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);

	if (Akey.isDown)				// Move Left
    {
        player.body.velocity.x = -100;
        player.animations.play('left');
    }
    else if (Dkey.isDown)			// Move Right
    {
        
        player.body.velocity.x = 100;
        player.animations.play('right');
        
    }
    else if(Skey.isDown)			// Move South
    {  
    	player.body.velocity.y = 100;
    }
   
    else if (Wkey.isDown)			// Move North
    {
        player.body.velocity.y = -100;
    }
    else{							// If player doesn't press a button/at rest
    	player.body.velocity.y = 0;
    	player.body.velocity.x = 0;
    	player.animations.stop();
    }

    // Player 2 Movement
    var Ikey = game.input.keyboard.addKey(Phaser.Keyboard.I);
	var Jkey = game.input.keyboard.addKey(Phaser.Keyboard.J);
	var Kkey = game.input.keyboard.addKey(Phaser.Keyboard.K);
	var Lkey = game.input.keyboard.addKey(Phaser.Keyboard.L);

	if (Jkey.isDown)				// Move Left
    {
        //  Move to the left
        player2.body.velocity.x = -100;
        player2.animations.play('left');
    }
    else if (Lkey.isDown)			// Move Right
    {
        //  Move to the right
        player2.body.velocity.x = 100;

        player2.animations.play('right');
        
    }
    else if(Kkey.isDown)			// Move South
    {
        
    	player2.body.velocity.y = 100;

    }
    
    else if (Ikey.isDown)			// Move North
    {
        player2.body.velocity.y = -100;
    }
    else{							// Player doesn't press a button/At rest
    	player2.body.velocity.y = 0;
    	player2.body.velocity.x = 0;
    	player2.animations.stop();
    }
	
}