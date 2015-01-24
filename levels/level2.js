gameStates.level2 = function(){};

gameStates.level2.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('exit', 'assets/exit.png');
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player2.png');

    },

    create : function() {

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
        var exit = exits.create(400, 400, 'exit');

        //  The score
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        
    },

    update : function() {

        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player1, platforms);
        game.physics.arcade.collide(player2, platforms);
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.collide(stars, platforms);
        //game.physics.arcade.collide(exits, platforms);
        //game.physics.arcade.collide(player1, exits);
        //game.physics.arcade.collide(player2, exits);
        game.physics.arcade.collide(p1bullets, player2, shootPlayer);
        game.physics.arcade.collide(p2bullets, player1, shootPlayer);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(player1, stars, collectStar, null, this);
        game.physics.arcade.overlap(player2, stars, collectStar, null, this);
        game.physics.arcade.overlap(player1, exits, hitExit, null, this);
        game.physics.arcade.overlap(player2, exits, hitExit, null, this);
        game.physics.arcade.overlap(player1, p2bullets, shootPlayer, null, this);
        game.physics.arcade.overlap(player2, p1bullets, shootPlayer, null, this);

        //  Reset the players velocity (movement)
        //player1.body.velocity.x = 0;
        //player2.body.velocity.x = 0;

        p1shootTimer++;
        p2shootTimer++;
        moveChar();
        shootBullet();
    }
}

