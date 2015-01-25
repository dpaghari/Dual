gameStates.level6 = function(){};

gameStates.level6.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/background.jpg');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player2.png');
        game.load.image('pushblock', 'assets/pushblock.png');
        game.load.image('button', 'assets/diamond.png');

        game.load.audio('collect', 'assets/sounds/collect.mp3');
        game.load.audio('death', 'assets/sounds/death.mp3');
        game.load.audio('interact', 'assets/sounds/interact.mp3');
        game.load.audio('levelComplete', 'assets/sounds/levelComplete.mp3');
        game.load.audio('song', 'assets/sounds/song.mp3');
        game.load.audio('shoot', 'assets/sounds/shoot.mp3');
        game.load.audio('moving', 'assets/sounds/moving.mp3');     
 
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
        scoreText = game.add.text(16, 16, 'Player 1 Score: ' + player1Score, { fontSize: '32px', fill: '#000' });
		scoreText = game.add.text(game.world.width - 260, 16, 'Player 2 Score: ' + player2Score, { fontSize: '32px', fill: '#000' });

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

