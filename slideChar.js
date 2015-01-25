//Movement for level 5, Sliding

function slideChar(){

    var accel = 200;
    var speed = 200;
	// Player 1 Movement
	
	var Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	var Akey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	var Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	var Dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    // Sound for player movement
    //Assign it so we can reference it 
    // Parameters: song, volume (0-1), loop (boolean)
    var moving = game.add.audio('moving', .05, false);

    if (p1Touched == false && player1.body.acceleration == 0) {
       

        if (Akey.isDown)				// Move Left
        {
            player1.body.acceleration.x = -accel;

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();
        }
        else if (Dkey.isDown)			// Move Right
        {
            player1.body.acceleration.x = accel;

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();

        }

        else if(Skey.isDown)			// Move Down
        {  
            player1.body.acceleration.y = -accel;

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();

        }
       
        else if (Wkey.isDown)			// Move Up
        {
            player1.body.acceleration.y = -accel;
            
            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();
        }
        else{							// If player1 doesn't press a button/at rest
            player1.body.drag.set(700, 700);
        }
    }

    // Player 2 Movement
    var Ikey = game.input.keyboard.addKey(Phaser.Keyboard.I);
	var Jkey = game.input.keyboard.addKey(Phaser.Keyboard.J);
	var Kkey = game.input.keyboard.addKey(Phaser.Keyboard.K);
	var Lkey = game.input.keyboard.addKey(Phaser.Keyboard.L);
    if (p2Touched == false && player2.body.acceleration == 0) {
        if (Jkey.isDown)				// Move Left
        {
            player2.body.acceleration.x = -accel;

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();
        }
        else if (Lkey.isDown)			// Move Right
        {
            player2.body.acceleration.x = accel;
 
            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();
            
        }
        else if(Kkey.isDown)			// Move South
        {
            player2.body.acceleration.y = accel;

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();

        }
        
        else if (Ikey.isDown)			// Move North
        {
            player2.body.acceleration.y = -accel;
            player2_dir = 'up';

            // Play sound effect
            moving.loop = false;
            moving.duration = .01;
            //moving.play();
        }
        else{							// Player doesn't press a button/At rest
            player2.body.drag.set(700, 700);
        }
    }
}	
