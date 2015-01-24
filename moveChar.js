function moveChar(){

	// Player 1 Movement
	
	var Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	var Akey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	var Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	var Dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);

	if (Akey.isDown)				// Move Left
    {
        //player.body.velocity.x = -100;
        
        player1.x += -5;
        player1.animations.play('left');
        if (Wkey.isDown) {
            player1.y += -5;
        }

        if (Skey.isDown) {
            player1.y += 5;
        }
    }
    else if (Dkey.isDown)			// Move Right
    {
        
        //player1.body.velocity.x = 100;
        player1.x += 5;
        player1.animations.play('right');
        if (Skey.isDown) {
            player1.y += 5;
        }

        if (Wkey.isDown) {
            player1.y += -5;
        }

    }
    else if(Skey.isDown)			// Move South
    {  
    	//player1.body.velocity.y = 100;
    	player1.y += 5;
        player1.animations.play('left');
        if (Akey.isDown) {
            player1.x += -5;
        }
    }
   
    else if (Wkey.isDown)			// Move North
    {
        player1.y += -5;
        //player1.body.velocity.y = -100;
        player1.animations.play('right');
        if (Dkey.isDown) {
            player1.x += +5;
        }
    }

    else{							// If player1 doesn't press a button/at rest
    	player1.body.velocity.y = 0;
    	player1.body.velocity.x = 0;
    	player1.animations.stop();
    }

    // Player 2 Movement
    var Ikey = game.input.keyboard.addKey(Phaser.Keyboard.I);
	var Jkey = game.input.keyboard.addKey(Phaser.Keyboard.J);
	var Kkey = game.input.keyboard.addKey(Phaser.Keyboard.K);
	var Lkey = game.input.keyboard.addKey(Phaser.Keyboard.L);

	if (Jkey.isDown)				// Move Left
    {
        //  Move to the left
        //player2.body.velocity.x = -100;
        player2.x += -5;
        player2.animations.play('left');

        if (Ikey.isDown) {
            player2.y += -5;
        }

        if (Kkey.isDown) {
            player2.y += 5;
        }
    }
    else if (Lkey.isDown)			// Move Right
    {
        //  Move to the right
        //player2.body.velocity.x = 100;
        player2.x += 5;
        player2.animations.play('right');

        if (Kkey.isDown) {
            player2.y += 5;
        }

        if (Ikey.isDown) {
            player2.y += -5;
        }
        
    }
    else if(Kkey.isDown)			// Move South
    {
        player2.y += 5;
    	//player2.body.velocity.y = 100;

        if (Jkey.isDown) {
            player2.x += -5;
        }

    }
    
    else if (Ikey.isDown)			// Move North
    {
        player2.y += -5;
        //player2.body.velocity.y = -100;

        if (Lkey.isDown) {
            player2.x += +5;
        }
    }
    else{							// Player doesn't press a button/At rest
    	player2.body.velocity.y = 0;
    	player2.body.velocity.x = 0;
    	player2.animations.stop();
    }
	
}