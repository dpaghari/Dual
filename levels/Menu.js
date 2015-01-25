gameStates.menu = function(){};

gameStates.menu.prototype = {
    preload : function() {
        game.load.image('menu', 'assets/menu.jpg');
        game.load.image('play', 'assets/play.png');
    
    },
    
    create : function() {
    
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
        game.state.start('level1');
    },
    update : function() {

    }

}

