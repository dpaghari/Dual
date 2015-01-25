gameStates = {};
var p1exit;
var p2exit;
gameStates.level1 = function(){};

gameStates.level1.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/background.jpg');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('exit', 'assets/exit.png');
        game.load.spritesheet('p1exit', 'assets/p1exit.png', 45, 45);
        game.load.spritesheet('p2exit', 'assets/p2exit.png', 45, 45);
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player2.png');
        game.load.audio('collect', 'assets/sounds/collect.mp3');
        game.load.audio('death', 'assets/sounds/death.mp3');
        game.load.audio('interact', 'assets/sounds/interact.mp3');
        game.load.audio('levelComplete', 'assets/sounds/levelComplete.mp3');
        game.load.audio('main_menu', 'assets/sounds/main_menu.mp3');
        game.load.audio('main_menu_select', 'assets/sounds/main_menu_select.mp3');
        game.load.audio('song', 'assets/sounds/song.mp3');
        game.load.audio('shoot', 'assets/sounds/shoot.mp3');
        game.load.audio('moving', 'assets/sounds/moving.mp3');
    },

    create : function() {

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');

        //Assign it so we can reference it 
        // Parameters: song, volume (0-1), loop (boolean)
        var song1 = game.add.audio('song', .1, true);
        song1.loop = true;
        song1.play();

        //Adjust screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
        
        //p1exit
        p1exit = game.add.sprite(100, 100, 'p1exit');
        p1exit.animations.add('active', [0, 1, 2, 3, 4], 10, true);
        
        //p2exit
        p2exit = game.add.sprite(500, 500, 'p2exit');
        p2exit.animations.add('active', [0, 1, 2, 3, 4], 10, true);
        

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
        p1bullets = game.add.group();
        p2bullets = game.add.group();
        exits = game.add.group();

        //  We will enable physics for any star that is created in this group
        p1bullets.enableBody = true;
        p2bullets.enableBody = true;
        exits.enableBody = true;
        var exit = exits.create(400, 400, 'exit');

        //  The score
        scoreText = game.add.text(16, 16, 'P1: ' + player1Score, { fontSize: '32px', fill: '#000' });
		scoreText = game.add.text(game.world.width - 160, 16, 'P2: ' + player2Score, { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        
    },

    update : function() {

        p1exit.animations.play('active');
        p2exit.animations.play('active');
        
        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.collide(p1bullets, player2, destroyBullet);
        game.physics.arcade.collide(p2bullets, player1, destroyBullet);
        game.physics.arcade.collide(p1bullets, player2, hitPlayer);
        game.physics.arcade.collide(p2bullets, player1, hitPlayer);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
      
        game.physics.arcade.overlap(player1, exits, hitExit, touchedExit, this);
        game.physics.arcade.overlap(player2, exits, hitExit, touchedExit, this);
        
        // Changes level after short delay
        if(p1Touched == true && p2Touched == true){
            levelTimer++;
            if( levelTimer >= levelDelay){
    			player1Score += 50;
    			player2Score += 50;
                p1Touched = false;
                p2Touched = false;
                levelTimer = 0;
                
                var levelComplete = game.add.audio('levelComplete', .1, false);
                levelComplete.loop = false;
                levelComplete.play();
                levelComplete.totalDuration = .3;
                game.state.start('level2');
            }
        }
        

        p1shootTimer++;
        p2shootTimer++;
        moveChar();
        shootBullet();
    }
}

