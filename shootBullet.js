
function shootBullet(){

	// Player 1 Shooting
	var Ekey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    var Okey = game.input.keyboard.addKey(Phaser.Keyboard.O);
    var shoot = game.add.audio('shoot', .001, false);

    //see here: http://docs.phaser.io/Keyboard.js.html for the keycodes
    Ekey.onDown.add(function(Ekey) {
        shoot.loop = false;
        shoot.play();
        shoot.totalDuration = .2;

        if(p1shootTimer >= p1shootDelay){
            Shoot(player1, player1_dir);
            console.log("Shooting");
            p1shootTimer = 0;
        }    
    }, this);

    /*
	if (Ekey.isDown)				// When E is pressed / Shoot Button
    {
        if(p1shootTimer >= p1shootDelay){
            Shoot(player1, player1_dir);
            console.log("Shooting");
            p1shootTimer = 0;
        }

    }
    */

    Okey.onDown.add(function(Okey) {
        shoot.loop = false;
        shoot.play();
        shoot.totalDuration = .2;  

        shoot.loop = false;
        shoot.play();

        if(p2shootTimer >= p2shootDelay){
            Shoot(player2, player2_dir);
            console.log("Shooting");
            p2shootTimer = 0;
        }  
    }, this);
    
    /*
    if (Okey.isDown)                // When E is pressed / Shoot Button
    {
        shoot.loop = false;
        shoot.play();

        if(p2shootTimer >= p2shootDelay){
            Shoot(player2, player2_dir);
            console.log("Shooting");
            p2shootTimer = 0;
        }
    }
    */
}

function Shoot(player,playerDir){

    var shoot_playerDir = playerDir;
    switch(shoot_playerDir){
        case 'left':
        createBullet(player, playerDir);
        break;
        case 'right':
        createBullet(player, playerDir);
        break;
        case 'up':
        createBullet(player, playerDir);
        break;
        case 'down':
        createBullet(player, playerDir);
        break;
    }
}
function createBullet(player, playerDir){

    var bulletSpeed = 800;
    if(player == player1){

        var bullet = p1bullets.create(player1.x, player1.y, 'star');
            switch(playerDir){
                case 'left':
                bullet.body.velocity.x -= bulletSpeed;
                break;
                case 'right':
                bullet.body.velocity.x += bulletSpeed;
                break;
                case 'up':
                bullet.body.velocity.y -= bulletSpeed;
                break;
                case 'down':
                bullet.body.velocity.y += bulletSpeed;
                break;

            }
       
       
        
    }
    if(player == player2){
        var bullet = p2bullets.create(player2.x, player2.y, 'star');
        switch(playerDir){
                case 'left':
                bullet.body.velocity.x -= bulletSpeed;
                break;
                case 'right':
                bullet.body.velocity.x += bulletSpeed;
                break;
                case 'up':
                bullet.body.velocity.y -= bulletSpeed;
                break;
                case 'down':
                bullet.body.velocity.y += bulletSpeed;
                break;

        }
       
          
    }
}

