function moveCharInverted(movementType){
    var accel = 200;
    var speed = 200;
	// Player 1 Movement
	
	if(movementType == 0) { 
		// Player 2 Movement
		var Ikey = game.input.keyboard.addKey(Phaser.Keyboard.K);
		var Jkey = game.input.keyboard.addKey(Phaser.Keyboard.L);
		var Kkey = game.input.keyboard.addKey(Phaser.Keyboard.I);
		var Lkey = game.input.keyboard.addKey(Phaser.Keyboard.J);
	
		var Wkey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		var Akey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		var Skey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		var Dkey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	} else if(movementType == 1) { 
		// Player 2 Movement
		var Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		var Akey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		var Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		var Dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	
		var Ikey = game.input.keyboard.addKey(Phaser.Keyboard.I);
		var Jkey = game.input.keyboard.addKey(Phaser.Keyboard.J);
		var Kkey = game.input.keyboard.addKey(Phaser.Keyboard.K);
		var Lkey = game.input.keyboard.addKey(Phaser.Keyboard.L);
	} else if(movementType == 2) { 
		// Player 2 Movement
		var Ikey = game.input.keyboard.addKey(Phaser.Keyboard.L);
		var Jkey = game.input.keyboard.addKey(Phaser.Keyboard.K);
		var Kkey = game.input.keyboard.addKey(Phaser.Keyboard.J);
		var Lkey = game.input.keyboard.addKey(Phaser.Keyboard.I);
	
		var Wkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		var Akey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		var Skey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		var Dkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	} else { 
		// Player 2 Movement
		var Ikey = game.input.keyboard.addKey(Phaser.Keyboard.J);
		var Jkey = game.input.keyboard.addKey(Phaser.Keyboard.I);
		var Kkey = game.input.keyboard.addKey(Phaser.Keyboard.L);
		var Lkey = game.input.keyboard.addKey(Phaser.Keyboard.K);
	
		var Wkey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		var Akey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		var Skey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		var Dkey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	} 
    if (p1Touched == false) {
        // Sound for player movement
        //Assign it so we can reference it 
        // Parameters: song, volume (0-1), loop (boolean)
        var moving = game.add.audio('moving', .05, false);

        if (Akey.isDown)				// Move Left
        {
            player1.body.velocity.x = -speed;
            player1_dir = 'left';
            player1.animations.play('left');

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();

            if (Wkey.isDown) {
                player1.body.velocity.y = -speed;
            }
            if (Skey.isDown) {
                player1.body.velocity.y = speed;
            }
        }
        else if (Dkey.isDown)			// Move Right
        {
            player1.body.velocity.x = speed;
            //player1.body.acceleration.x = accel;
            player1_dir = 'right';
            player1.animations.play('right');

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();


            if (Wkey.isDown) {
                player1.body.velocity.y = -speed;
                //player1.y += -5;
            } 
            
            if (Skey.isDown) {
                player1.body.velocity.y = speed;
            }
        }

        else if(Skey.isDown)			// Move Down
        {  
            player1.body.velocity.y = speed;
            player1_dir = 'down';
            player1.animations.play('left');

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();


            if (Dkey.isDown) {
                player1.body.velocity.x = speed;
            }
            if (Akey.isDown) {
                player1.body.velocity.x = -speed;
            }
        }
       
        else if (Wkey.isDown)			// Move Up
        {
            player1.body.velocity.y = -speed;
            player1_dir = 'up';
            player1.animations.play('right');

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();

            if (Dkey.isDown) {
                player1.body.velocity.x = speed;

            }
            if (Akey.isDown) {
                player1.body.velocity.x = -speed;

            }
        }
        else{							// If player1 doesn't press a button/at rest
                player1.body.drag.set(700, 700);
                player1.animations.stop();
            }
    }


    if (p2Touched == false) {
        if (Jkey.isDown)				// Move Left
        {
            player2.body.velocity.x = -speed;
            player2_dir = 'left';
            player2.animations.play('left');

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();

            if (Ikey.isDown) {
                player2.body.velocity.y = -speed;
            }

            if (Kkey.isDown) {
                player2.body.velocity.y = speed;
            }
        }
        else if (Lkey.isDown)			// Move Right
        {
            player2.body.velocity.x = speed;
            player2_dir = 'right';
            player2.animations.play('right');

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();

            if (Ikey.isDown) {
                player2.body.velocity.y = -speed;
            }

            if (Kkey.isDown) {
                player2.body.velocity.y = speed;
            }
            
        }
        else if(Kkey.isDown)			// Move South
        {
            player2.body.velocity.y = speed;
            player2_dir = 'down';

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();

            if (Jkey.isDown) {
                player2.body.velocity.x = -speed;
            }
            if (Lkey.isDown) {
                player2.body.velocity.x = speed;
            }

        }
        
        else if (Ikey.isDown)			// Move North
        {
            player2.body.velocity.y = -speed;
            player2_dir = 'up';

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();

            if (Jkey.isDown) {
                player2.body.velocity.x = -speed;
            }
            if (Lkey.isDown) {
                player2.body.velocity.x = speed;
            }
        }
        else{							// Player doesn't press a button/At rest
            player2.body.drag.set(500, 500);
            player2.animations.stop();
        }
    }
	
}	
