gameStates.level5 = function(){};

gameStates.level5.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/background.jpg');
        game.load.image('exit', 'assets/exit.png');
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player2.png');
        game.load.image('block', 'assets/block.png');
        game.load.audio('collect', 'assets/sounds/collect.mp3');
        game.load.audio('death', 'assets/sounds/death.mp3');
        game.load.audio('interact', 'assets/sounds/interact.mp3');
        game.load.audio('levelComplete', 'assets/sounds/levelComplete.mp3');
        game.load.audio('song', 'assets/sounds/song.mp3');
        game.load.audio('moving', 'assets/sounds/moving.mp3');
    },

    create : function() {
        
        //Adjust screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');

        exits = game.add.group();
        exits.enableBody = true;
        var exit = exits.create(600, 250, 'exit');
        
        //Assign it so we can reference it 
        // Parameters: song, volume (0-1), loop (boolean)
        var song1 = game.add.audio('song', .1, true);
        song1.loop = true;
        song1.play();


        // The player and its settings
        player1 = game.add.sprite(32, game.world.height - 150, 'player1');
        player2 = game.add.sprite(128, game.world.height - 150, 'player2');

        blocks = game.add.group();
        blocks.enableBody = true;
        var block = blocks.create(200, 200, 'block');
        block = blocks.create(300, 300, 'block');
        block = blocks.create(100, 0, 'block');

        //  We need to enable physics on the players
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);

        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;

        //  Our controls
        cursors = game.input.keyboard.createCursorKeys();
        
    },

    update : function() {

        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player1, player2);

        // Collide with exit, set exit flags
        game.physics.arcade.overlap(player1, exits, hitExit, touchedExit, this);
        game.physics.arcade.overlap(player2, exits, hitExit, touchedExit, this);

                // Changes level after short delay
        if(p1Touched == true || p2Touched == true){
            levelTimer++;
            if( levelTimer >= levelDelay){
            p1Touched = false;
            p2Touched = false;

            levelTimer = 0;
            game.state.start('menu');
            }
        }
        

        slideChar();
    }
}
