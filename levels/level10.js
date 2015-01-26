gameStates.level10 = function(){};
var darknessPhase;

gameStates.level10.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/backgrounds/Gray.jpg');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.spritesheet('exit', 'assets/exit.png', 45, 45);
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player2.png');
        game.load.image('pushblock', 'assets/pushblock.png');
		game.load.image('darkness', 'assets/darkness.png');
        game.load.image('clear', 'assets/clear.png');

        //  Load the Google WebFont Loader script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

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
        //platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        //platforms.enableBody = true;


        // The player and its settings
        player1 = game.add.sprite(0, game.world.height - 150, 'player1');
        player2 = game.add.sprite(500, game.world.height - 150, 'player2');



        // Place the exit door in the world
        //exit = game.add.sprite(150, 5, 'exit');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);


        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;

        //  Finally some stars to collect
        stars = game.add.group();
        p1bullets = game.add.group();
        p2bullets = game.add.group();
        exits = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;
        p1bullets.enableBody = true;
        p2bullets.enableBody = true;
        exits.enableBody = true;
        exit = exits.create(400, 400, 'exit');
        exit.animations.add('active', [0, 1, 2, 3, 4], 10, true);

        //  The score
        scoreText = game.add.text(100, 16, 'P1: ' + player1Score, { fontSize: '32px', fill: '#FFF'});
        scoreText.font = 'Lato';
        scoreText = game.add.text(game.world.width - 160, 16, 'P2: ' + player2Score, { fontSize: '32px', fill: '#FFF'});
        scoreText.font = 'Lato';

        //  Our controls.
		lightTimer = 0;
		dark = false;
		darknessPhase = ((Math.random() + .5) * 130);
        cursors = game.input.keyboard.createCursorKeys();

        clear = game.add.sprite(game.width/2-100, -200, 'clear');       
        game.physics.enable(clear, Phaser.Physics.ARCADE);
        
    },

    update : function() {
        exit.animations.play('active');
         //  Collide the player and the stars with the platforms
        
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.collide(p1bullets, player2, destroyBullet);
        game.physics.arcade.collide(p2bullets, player1, destroyBullet);
        //game.physics.arcade.collide(player1, pushblock);
        //game.physics.arcade.collide(player2, pushblock);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        //game.physics.arcade.overlap(pushblock, exits, blockExit, null, this);
        
        game.physics.arcade.overlap(player1, exits, hitExit, touchedExit, this);
        game.physics.arcade.overlap(player2, exits, hitExit, touchedExit, this);
        
        if(buttonActivated == true){
            if(doorMade == false){
                var exitDoor;
                exitDoor = game.add.sprite(300, 10, 'exit');
                doorMade == true;
            }
            buttonActivated = false;

        }
		
		lightTimer++;
		if(lightTimer > 60 && dark == false) {
			dark = true;
			lightTimer = 0;
			darkness = game.add.sprite(0, 0, 'darkness');
			darkness.alpha = 0.2;
		} else if(lightTimer > darknessPhase && dark == true) {
			//console.log("Lights On");
			dark = false;
			lightTimer = 0;
			darkness.kill();
			exits.enableBody = true;
			exit.x = game.world.width * Math.random();
			exit.y = game.world.height * Math.random(); 
			darknessPhase = ((Math.random() + .5) * 130);
		}
		if(dark == true && lightTimer % 3 == 0 && darkness.alpha < 1) {
			darkness.alpha += .1;		
		}

         if(p1Touched == true){
            game.physics.arcade.moveToXY(player1, exit.x + 9, exit.y + 3, 300, 300) ;
            this.game.world.addAt(player1, 10);
            this.game.world.addAt(exit, 1);
        }
        if(p2Touched == true){
            game.physics.arcade.moveToXY(player2, exit.x + 9, exit.y + 3, 300, 300) ;
            this.game.world.addAt(player2, 9);
            this.game.world.addAt(exit, 2);
        }

        if(p1Touched == true || p2Touched == true){
            if(p1Touched == true){
                player1Score += 50;
            }
            else{
                player2Score += 50;
            }
            if (clear.y >= game.height/2 - 50){
                clear.body.velocity.y = 0;
                clear.body.acceleration.y = 0;
            }
            else {
                clear.body.acceleration.y = 1000;
            }

            
            levelTimer++;
            if ( levelTimer == 60 ) {
                var levelComplete = game.add.audio('levelComplete', .1, false);
                levelComplete.loop = false;
                levelComplete.play();
                levelComplete.totalDuration = .3;
                
            }
            
            if( levelTimer >= levelDelay){
                player1Score += 50;
                player2Score += 50;
                p1Touched = false;
                p2Touched = false;
                levelTimer = 0;
                

                game.state.start('level11');
            }
        }
        moveChar();
    }
}

