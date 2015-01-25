gameStates.level9 = function(){};
var player1ScoreText;
var player2ScoreText;
var updateTimer;
var p1exit;
var p2exit;

gameStates.level9.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/backgrounds/Gold.jpg');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('star', 'assets/star.png');
		game.load.image('bullet', 'assets/bullet.png');
        //game.load.image('exit', 'assets/exit.png');
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player2.png');
        game.load.spritesheet('p1exit', 'assets/p1exit.png', 45, 45);
        game.load.spritesheet('p2exit', 'assets/p2exit.png', 45, 45);
        game.load.image('clear', 'assets/clear.png');

        game.load.audio('collect', 'assets/sounds/collect.mp3');
        game.load.audio('death', 'assets/sounds/death.mp3');
        game.load.audio('interact', 'assets/sounds/interact.mp3');
        game.load.audio('levelComplete', 'assets/sounds/levelComplete.mp3');
        game.load.audio('song', 'assets/sounds/song.mp3');
        game.load.audio('shoot', 'assets/sounds/shoot.mp3');
        game.load.audio('moving', 'assets/sounds/moving.mp3');

        //  Load the Google WebFont Loader script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },

    create : function() {
		updateTimer = 0;
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');

        //Assign it so we can reference it 
        // Parameters: song, volume (0-1), loop (boolean)
        //var song1 = game.add.audio('song', .1, true);
        //song1.loop = true;
        //song1.play();

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
        player1 = game.add.sprite(32, game.world.height - 150, 'player1');
        player2 = game.add.sprite(128, game.world.height - 150, 'player2');

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
        p1exits = game.add.group();
        p2exits = game.add.group();
        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;
        p1bullets.enableBody = true;
        p2bullets.enableBody = true;
        p1exits.enableBody = true;
        p2exits.enableBody = true;
        
        p1exit = p1exits.create(400, 400, 'p1exit');
        p1exit.animations.add('active', [0, 1, 2, 3, 4], 10, true);
        p2exit = p2exits.create(200, 500, 'p2exit');
        p2exit.animations.add('active', [0, 1, 2, 3, 4], 10, true);
		
		for(var i = 0; i < 10; i++) {
			createRandomCoin();
		}

        //  The score
        player1ScoreText = game.add.text(100, 16, 'P1: ' + player1Score, { fontSize: '32px', fill: '#FFF'});
        player1ScoreText.font = 'Lato';
        player2ScoreText = game.add.text(game.world.width - 160, 16, 'P2: ' + player2Score, { fontSize: '32px', fill: '#FFF'});
        player2ScoreText.font = 'Lato';

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

        clear = game.add.sprite(game.width/2-100, -200, 'clear');       
        game.physics.enable(clear, Phaser.Physics.ARCADE);
        
    },

    update : function() {
        p1exit.animations.play('active');
        p2exit.animations.play('active');
        //  Collide the player and the stars with the platforms
        //game.physics.arcade.collide(player1, platforms);
        //game.physics.arcade.collide(player2, platforms);
		
		game.physics.arcade.collide(player1, stars, collectStar);
        game.physics.arcade.collide(player2, stars, collectStar);
		
		//game.physics.arcade.collide(player1, exits, hitExit);
        //game.physics.arcade.collide(player2, exits, hitExit);
		
        game.physics.arcade.collide(player1, player2);
        //game.physics.arcade.collide(stars, platforms);
		
        game.physics.arcade.collide(p1bullets, player2, destroyBullet);
        game.physics.arcade.collide(p2bullets, player1, destroyBullet);
		

        game.physics.arcade.overlap(player1, p1exits, hitExit, touchedExit, this);
        game.physics.arcade.overlap(player2, p2exits, hitExit, touchedExit, this);
        
		updateTimer++;
		if(updateTimer >= 10) {
			player1ScoreText.setText('P1: ' + player1Score);
			player2ScoreText.setText('P2: ' + player2Score);
			updateTimer = 0;
		}
		if(stars.length < 5) {
			createRandomCoin();
		}		
		
		if(Math.random() < 0.004) {
			createRandomCoin();
		}

         if(p1Touched == true){
            game.physics.arcade.moveToXY(player1, p1exit.x + 9, p1exit.y + 3, 300, 300) ;
            this.game.world.addAt(player1, 10);
            this.game.world.addAt(p1exit, 1);
        }
        if(p2Touched == true){
            game.physics.arcade.moveToXY(player2, p2exit.x + 9, p2exit.y + 3, 300, 300) ;
            this.game.world.addAt(player2, 9);
            this.game.world.addAt(p2exit, 2);
        }



		 if(p1Touched == true && p2Touched == true){
            levelTimer++;
            if (clear.y >= game.height/2 - 50){
                clear.body.velocity.y = 0;
                clear.body.acceleration.y = 0;
            }
            else {
                clear.body.acceleration.y = 1000;
            }

            
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
                

                game.state.start('level10');
            }
        }
        //p1shootTimer++;
        //p2shootTimer++;
        moveChar();
        shootBullet();
    }
}


