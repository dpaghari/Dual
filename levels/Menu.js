gameStates.menu = function(){};

gameStates.menu.prototype = {
    preload : function() {
        game.load.image('menu', 'assets/menu.jpg');
        game.load.image('play', 'assets/play.png');

        game.load.audio('main_menu', 'assets/sounds/main_menu.mp3');
        game.load.audio('game_start', 'assets/sounds/game_start.mp3');
    
    },
    
    create : function() {
        //Assign it so we can reference it 
        // Parameters: song, volume (0-1), loop (boolean)
        var main_menu = game.add.audio('main_menu', .1, false);
        main_menu.loop = false;
        main_menu.play();

            //Adjust screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
        game.add.sprite (0, 0, 'menu');
        this.startButton = this.game.add.button(this.game.width/2, this.game.height - 70, 'play', this.startClick, this);
        //set anchor to middle
        this.startButton.anchor.setTo(.5, .5);
    }, 
    startClick: function() {
        var game_start = game.add.audio('game_start', .1, false);
        game_start.loop = false;
        game_start.play();

        game.state.start('level11');
    },
    update : function() {

    }

}

