gameStates.level6 = function(){};

gameStates.level6.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/background.jpg');
        game.load.image('bullet', 'assets/bullet.png');
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

        // The player and its settings
        player1 = game.add.sprite(0, game.world.height - 150, 'player1');
        player2 = game.add.sprite(500, game.world.height - 150, 'player2');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);
        

        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;
        

        //  Finally some stars to collect
        
        p1bullets = game.add.group();
        p2bullets = game.add.group();
        
        //  We will enable physics for any star that is created in this group
       
        p1bullets.enableBody = true;
        p2bullets.enableBody = true;
        //  The score
        scoreText = game.add.text(16, 16, 'P1: ' + player1Score, { fontSize: '32px', fill: '#000' });
		scoreText = game.add.text(game.world.width - 160, 16, 'P2: ' + player2Score, { fontSize: '32px', fill: '#000' });

    },

    update : function() {
  
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.collide(p1bullets, player2, destroyBullet);
        game.physics.arcade.collide(p2bullets, player1, destroyBullet);
    
        p1shootTimer++;
        p2shootTimer++;
        moveChar();
        shootBullet();
        
    }
}

