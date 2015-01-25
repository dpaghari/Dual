var buttonActivated;
var doorMade;

gameStates.level3 = function(){};

gameStates.level3.prototype = {



    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/background.jpg');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('exit', 'assets/exit.png');
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player2.png');
        game.load.image('pushblock', 'assets/pushblock.png');
        game.load.image('button', 'assets/switch.png');

    },

    create : function() {
        
        
        buttonActivated = false;
        doorMade = false;
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');

        //Adjust screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        //  Finally some stars to collect
        stars = game.add.group();
        p1bullets = game.add.group();
        p2bullets = game.add.group();
        exits = game.add.group();
        buttons = game.add.group();
        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;
        p1bullets.enableBody = true;
        p2bullets.enableBody = true;
        exits.enableBody = true;
        buttons.enableBody = true;

        var button = buttons.create(400, 400, 'button');
        
        // The player and its settings
        player1 = game.add.sprite(0, game.world.height - 150, 'player1');
        player2 = game.add.sprite(500, game.world.height - 150, 'player2');
        pushblock = game.add.sprite(game.world.width/2, game.world.height/2, 'pushblock');



        // Place the exit door in the world
        //exit = game.add.sprite(150, 5, 'exit');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);
        game.physics.arcade.enable(pushblock);

        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;
        pushblock.body.collideWorldBounds = true;


        //var exit = exits.create(400, 400, 'exit');

        //  The score
        scoreText = game.add.text(16, 16, 'Player 1 Score: ' + player1Score, { fontSize: '32px', fill: '#000' });
		scoreText = game.add.text(game.world.width - 260, 16, 'Player 2 Score: ' + player2Score, { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();


        
    },

    update : function() {

         //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player1, platforms);
        game.physics.arcade.collide(player2, platforms);
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.collide(p1bullets, player2, destroyBullet);
        game.physics.arcade.collide(p2bullets, player1, destroyBullet);
        game.physics.arcade.collide(player1, pushblock);
        game.physics.arcade.collide(player2, pushblock);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(pushblock, buttons, blockExit, null, this);
        game.physics.arcade.overlap(player1, exits, hitExit, touchedExit, this);
        game.physics.arcade.overlap(player2, exits, hitExit, touchedExit, this);
       

       if(buttonActivated == true){
        
            if(doorMade == false){
                
            exitDoor = exits.create(30, 300, 'exit');
            doorMade = true;
            }
            buttonActivated = false;
        }
        else{
            if(doorMade == true){
                exitDoor.destroy();
                doorMade = false;
            }
        }

        if(p1Touched == true || p2Touched == true){

            levelTimer++;
            if( levelTimer >= levelDelay){
			if(p1Touched == true) {
				player2Score += 50;
			} else {
				player1Score += 50;
			}
            p1Touched = false;
            p2Touched = false;
            levelTimer = 0;

            var levelComplete = game.add.audio('levelComplete', .1, false);
            levelComplete.loop = false;
            levelComplete.play();
            levelComplete.totalDuration = .2;
            game.state.start('level4');
            
            }
        }

        p1shootTimer++;
        p2shootTimer++;
        moveChar();
        shootBullet();
        pushblock.body.velocity.x = 0;
        pushblock.body.velocity.y = 0;
    }
}

