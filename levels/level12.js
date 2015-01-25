gameStates.level12 = function(){};
var player1ScoreText;
var player2ScoreText;
var player1HealthText;
var player2HealthText;
var updateTimer;
var player1HP;
var player2HP;
var bossHP;
var boss;
var bossBullets;
var bossShootTimer;

gameStates.level12.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/backgrounds/Aqua.jpg');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('exit', 'assets/exit.png');
        game.load.image('player1', 'assets/player1_tank.png');
        game.load.image('player2', 'assets/player2_tank.png');
        game.load.image('player1_tank', 'assets/player1_tank.png');
        game.load.image('player2_tank', 'assets/player2_tank.png');
        game.load.image('pushblock', 'assets/firstaid.png');
        game.load.image('block', 'assets/block.png');

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
		player1HP = 10;
		player2HP = 10;
		bossHP = 60;
		bossShootTimer = 0;

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');

        //Adjust screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
        //  The platforms group contains the ground and the 2 blocks we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;


        // The player and its settings
        player1 = game.add.sprite(20, game.world.height - 325, 'player1_tank');
        player2 = game.add.sprite(750, game.world.height - 325, 'player2_tank');
		boss = game.add.sprite(16, 16, 'player2_tank');
		boss.width = 800;
		
        //player1.body.polygon.rotate.angle*Math.PI/180;
        //player1.body.polygon.translate 0, player1.height;
		/*
        block1 = game.add.sprite(200, 50, 'block');
        block2 = game.add.sprite(200, 250, 'block');
        block3 = game.add.sprite(200, 350, 'block');
        block4 = game.add.sprite(200, 550, 'block');
        block5 = game.add.sprite(500, 50, 'block');
        block6 = game.add.sprite(500, 250, 'block');
        block7 = game.add.sprite(500, 350, 'block');
        block8 = game.add.sprite(500, 550, 'block');
		*/

        // Place the exit door in the world
        //exit = game.add.sprite(150, 5, 'exit');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);
		game.physics.arcade.enable(boss);
		/*
        game.physics.arcade.enable(block1);
        game.physics.arcade.enable(block2);
        game.physics.arcade.enable(block3);
        game.physics.arcade.enable(block4);
        game.physics.arcade.enable(block5);
        game.physics.arcade.enable(block6);
        game.physics.arcade.enable(block7);
        game.physics.arcade.enable(block8);
		*/
        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;
		boss.body.collideWorldBounds = true;
	
		/*
        block1.body.immovable = true;
        block2.body.immovable = true;
        block3.body.immovable = true;
        block4.body.immovable = true;
        block5.body.immovable = true;
        block6.body.immovable = true;
        block7.body.immovable = true;
        block8.body.immovable = true;
		*/

        //  Finally some stars to collect
        stars = game.add.group();
        p1bullets = game.add.group();
        p2bullets = game.add.group();
		bossBullets = game.add.group();
        exits = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;
        p1bullets.enableBody = true;
        p2bullets.enableBody = true;
		bossBullets.enableBody = true;
        exits.enableBody = true;

        //  The score

        player1ScoreText = game.add.text(100, 16, 'P1: ' + player1Score, { fontSize: '32px', fill: '#000' });
		player2ScoreText = game.add.text(game.world.width - 160, 16, 'P2: ' + player2Score, { fontSize: '32px', fill: '#000' });
		player1HealthText = game.add.text(100, 46, 'P1HP: ' + player1HP, { fontSize: '32px', fill: '#000' });
		player2HealthText = game.add.text(game.world.width - 160, 46, 'P2HP: ' + player2HP, { fontSize: '32px', fill: '#000' });
		boss.body.velocity.y += 20;

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
    },

    update : function() {

         //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player1, platforms);
        game.physics.arcade.collide(player2, platforms);
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.collide(player1, p2bullets, destroyBullet);
        game.physics.arcade.collide(player2, p1bullets, destroyBullet);
		
		game.physics.arcade.collide(boss, p1bullets, hitBoss);
		game.physics.arcade.collide(boss, p2bullets, hitBoss);
		game.physics.arcade.collide(boss, player1, collideWithBoss);
		game.physics.arcade.collide(boss, player2, collideWithBoss);
		game.physics.arcade.collide(player1, bossBullets, hitPlayer);
		game.physics.arcade.collide(player2, bossBullets, hitPlayer);
		
		/*
        game.physics.arcade.collide(p1bullets, block1, hitBlock);
        game.physics.arcade.collide(p2bullets, block1, hitBlock);
        game.physics.arcade.collide(p1bullets, block2, hitBlock);
        game.physics.arcade.collide(p2bullets, block2, hitBlock);
        game.physics.arcade.collide(p1bullets, block3, hitBlock);
        game.physics.arcade.collide(p2bullets, block3, hitBlock);
        game.physics.arcade.collide(p1bullets, block4, hitBlock);
        game.physics.arcade.collide(p2bullets, block4, hitBlock);
        game.physics.arcade.collide(p1bullets, block5, hitBlock);
        game.physics.arcade.collide(p2bullets, block5, hitBlock);
        game.physics.arcade.collide(p1bullets, block6, hitBlock);
        game.physics.arcade.collide(p2bullets, block6, hitBlock);
        game.physics.arcade.collide(p1bullets, block7, hitBlock);
        game.physics.arcade.collide(p2bullets, block7, hitBlock);
        game.physics.arcade.collide(p1bullets, block8, hitBlock);
        game.physics.arcade.collide(p2bullets, block8, hitBlock);

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
        game.physics.arcade.collide(player1, block6);
        game.physics.arcade.collide(player2, block6);
        game.physics.arcade.collide(player1, block7);
        game.physics.arcade.collide(player2, block7);
        game.physics.arcade.collide(player1, block8);
        game.physics.arcade.collide(player2, block8);
		*/

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        

        //game.physics.arcade.overlap(pushblock, exits, hitExit, null, this);
        /*
        game.physics.arcade.overlap(player1, exits, hitExit, null, this);
        game.physics.arcade.overlap(player2, exits, hitExit, null, this);
        */
		updateTimer++;
		if(updateTimer >= 10) {
			player1ScoreText.setText('P1: ' + player1Score);
			player2ScoreText.setText('P2: ' + player2Score);
			player1HealthText.setText('P1HP: ' + player1HP);
			player2HealthText.setText('P2HP: ' + player2HP);
			updateTimer = 0;
		}
		
        p1shootTimer++;
        p2shootTimer++;
		bossShootTimer++;
        moveChar();
        shootBullet();    
		
		if(bossShootTimer > 7) {
			bossShootTimer = 0;
			bossShoot();
		}
		if(boss.body.velocity.y >= 20) {
			boss.body.velocity.y -= 1;
		}
		if(boss.body.velocity.y <= 100) {
			boss.body.velocity.y += 20;
		}
		if(player1HP <= 0 || player2HP <= 0) {
			player1HealthText.setText('P1HP: ' + player1HP);
			player2HealthText.setText('P2HP: ' + player2HP);
			lossText = game.add.text(350, 300, 'You Lose', { fontSize: '64px', fill: '#000' });
			var levelComplete = game.add.audio('levelComplete', .1, false);
			levelComplete.loop = false;
            levelComplete.play();
            levelComplete.totalDuration = .2;
            game.state.start('level12');
		}
        if (bossHP <= 0) {
            var levelComplete = game.add.audio('levelComplete', .1, false);
			winText = game.add.text(350, 300, 'You Win!', { fontSize: '64px', fill: '#000' });
            levelComplete.loop = false;
            levelComplete.play();
            levelComplete.totalDuration = .2;
            game.state.start('menu');
        }    
    }
}

