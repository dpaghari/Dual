gameStates.level7 = function(){};

gameStates.level7.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/background.jpg');
        game.load.image('exit', 'assets/exit.png');
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player2.png');
        game.load.image('block', 'assets/block.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.audio('collect', 'assets/sounds/collect.mp3');
        game.load.audio('death', 'assets/sounds/death.mp3');
        game.load.audio('interact', 'assets/sounds/interact.mp3');
        game.load.audio('levelComplete', 'assets/sounds/levelComplete.mp3');
        game.load.audio('song', 'assets/sounds/song.mp3');
        game.load.audio('moving', 'assets/sounds/moving.mp3');

        //  Load the Google WebFont Loader script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
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
        var exit = exits.create(400, 300, 'exit');
        
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
        
		/*
        var block = blocks.create(168, 450, 'block');
        block.body.immovable = true;
        block = blocks.create(736, 482, 'block');
        block.body.immovable = true;
        block = blocks.create(200, 186, 'block');
        block.body.immovable = true;
        block = blocks.create(0, 154, 'block');
        block.body.immovable = true;
        block = blocks.create(672, 90, 'block');
        block.body.immovable = true;
        block = blocks.create(400, 122, 'block');
        block.body.immovable = true;
        block = blocks.create(168, 418, 'block');
        block.body.immovable = true;
		*/
        //  We need to enable physics on the players
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);
        
        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;
        
       
        
        //  The score
        scoreText = game.add.text(100, 16, 'P1: ' + player1Score, { fontSize: '32px', fill: '#FFF'});
        scoreText.font = 'Lato';
        scoreText = game.add.text(game.world.width - 160, 16, 'P2: ' + player2Score, { fontSize: '32px', fill: '#FFF'});
        scoreText.font = 'Lato';

        cursors = game.input.keyboard.createCursorKeys();
        
    },

    update : function() {

        //  Collide the players
        game.physics.arcade.collide(player1, player2, stap);
        player1.body.blocked.player2 = true;
        player2.body.blocked.player1 = true;
        
        if (player1.body.velocity.x == 0 && player1.body.velocity.y == 0) {
            player1.body.immovable = true;
        }
        else {
            player1.body.immovable = false;
        }
        if (player2.body.velocity.x == 0 && player2.body.velocity.y == 0) {
            player2.body.immovable = true;
        }
        else {
            player2.body.immovable = false;
        }
        
        function stap() {
            player1.body.overlapX;
            player1.body.overlapY;
            player2.body.overlapX;
            player2.body.overlapY;
            
            player1.body.velocity.x = 0;
            player1.body.velocity.y = 0;
            player2.body.velocity.x = 0;
            player2.body.velocity.y = 0;
            player2.body.acceleration.x = 0;
            player2.body.acceleration.y = 0;
            player1.body.acceleration.x = 0;
            player1.body.acceleration.y = 0;
        }
        
        //Collide with the Blocks
        game.physics.arcade.collide(player1, blocks);
        game.physics.arcade.collide(player2, blocks);

        // Collide with exit, set exit flags
        game.physics.arcade.overlap(player1, exits, hitExit, touchedExit, this);
        game.physics.arcade.overlap(player2, exits, hitExit, touchedExit, this);


         if(p1Touched == true){
            game.physics.arcade.moveToXY(player1, exit.x -20, exit.y + 3, 300, 300) ;
            this.game.world.addAt(player1, 10);
            this.game.world.addAt exit, 1);
        }
        if(p2Touched == true){
            game.physics.arcade.moveToXY(player2, exit.x + 20, exit.y + 3, 300, 300) ;
            this.game.world.addAt(player2, 9);
            this.game.world.addAt exit, 2);
        }



        // Changes level after short delay
        if(p1Touched == true || p2Touched == true){
            levelTimer++;
            if( levelTimer >= levelDelay){
                p1Touched = false;
                p2Touched = false;
                levelTimer = 0;
				player1Score += 50;
				player2Score += 50;                
                var levelComplete = game.add.audio('levelComplete', .1, false);
                levelComplete.loop = false;
                levelComplete.play();
                levelComplete.totalDuration = .2;
            
                game.state.start('level9');
            }


        }
        
        slideChar();
    }
}
