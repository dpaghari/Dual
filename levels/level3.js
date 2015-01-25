var buttonActivated;
var doorMade;
var block;
var button;

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
        game.load.image('block', 'assets/block.png');
        game.load.image('button', 'assets/switch.png');

        game.load.audio('collect', 'assets/sounds/collect.mp3');
        game.load.audio('death', 'assets/sounds/death.mp3');
        game.load.audio('interact', 'assets/sounds/interact.mp3');
        game.load.audio('levelComplete', 'assets/sounds/levelComplete.mp3');
        game.load.audio('song', 'assets/sounds/song.mp3');
        game.load.audio('shoot', 'assets/sounds/shoot.mp3');
        game.load.audio('moving', 'assets/sounds/moving.mp3');

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
        blocks = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;
        p1bullets.enableBody = true;
        p2bullets.enableBody = true;
        exits.enableBody = true;
        buttons.enableBody = true;
        blocks.enableBody = true;
        
        // The player and its settings
        player1 = game.add.sprite(0, game.world.height - 150, 'player1');
        player2 = game.add.sprite(500, game.world.height - 150, 'player2');
        pushblock = game.add.sprite(game.world.width/2, game.world.height/2, 'pushblock');
        button = buttons.create(650, 90, 'button');
        block1 = blocks.create(590, 50, 'block');
        block2 = blocks.create(650, 50, 'block');
        block3 = blocks.create(710, 50, 'block');
        block4 = blocks.create(590, 100, 'block');
        block5 = blocks.create(710, 100, 'block');

        // Place the exit door in the world
        //exit = game.add.sprite(150, 5, 'exit');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);
        game.physics.arcade.enable(pushblock);
        game.physics.arcade.enable(block1);
        game.physics.arcade.enable(block2);
        game.physics.arcade.enable(block3);
        game.physics.arcade.enable(block4);
        game.physics.arcade.enable(block5);
        
        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;
        pushblock.body.collideWorldBounds = true;
        block1.body.collideWorldBounds = true;
        block2.body.collideWorldBounds = true;
        block3.body.collideWorldBounds = true;
        block4.body.collideWorldBounds = true;
        block5.body.collideWorldBounds = true;

        block1.body.immovable = true;
        block2.body.immovable = true;
        block3.body.immovable = true;
        block4.body.immovable = true;
        block5.body.immovable = true;

        stars = game.add.group();
        p1bullets = game.add.group();
        p2bullets = game.add.group();
        exits = game.add.group();
        buttons = game.add.group();
        blocks = game.add.group();

        //  The score
        scoreText = game.add.text(16, 16, 'Player 1 Score: ' + player1Score, { fontSize: '32px', fill: '#000' });
		scoreText = game.add.text(game.world.width - 260, 16, 'Player 2 Score: ' + player2Score, { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

    },

    update : function() {

         //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.collide(player2, player1);

        game.physics.arcade.collide(p1bullets, player2, destroyBullet);
        game.physics.arcade.collide(p2bullets, player1, destroyBullet);
        game.physics.arcade.collide(player1, pushblock);
        game.physics.arcade.collide(player2, pushblock);

        game.physics.arcade.collide(player1, block1);
        game.physics.arcade.collide(player2, block1);
        game.physics.arcade.collide(player1, block2);
        game.physics.arcade.collide(player2, block2);
        game.physics.arcade.collide(player1, block3);
        game.physics.arcade.collide(player2, block3);
        game.physics.arcade.collide(player1, block4);
        game.physics.arcade.collide(player2, block4);
        game.physics.arcade.collide(player1, block5);
        game.physics.arcade.collide(player2, block5);

        game.physics.arcade.collide(pushblock, block1);
        game.physics.arcade.collide(pushblock, block2);
        game.physics.arcade.collide(pushblock, block3);
        game.physics.arcade.collide(pushblock, block4);
        game.physics.arcade.collide(pushblock, block5);

        game.physics.arcade.overlap(pushblock, buttons, blockExit, null, this);

        game.physics.arcade.overlap(player1, exits, hitExit, touchedExit, this);
        game.physics.arcade.overlap(player2, exits, hitExit, touchedExit, this);

        game.physics.arcade.collide(p1bullets, blocks, hitBlock);
        game.physics.arcade.collide(p2bullets, blocks, hitBlock);

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

