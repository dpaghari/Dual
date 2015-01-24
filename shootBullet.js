
function shootBullet(){

	// Player 1 Shooting
	var Ekey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    var Okey = game.input.keyboard.addKey(Phaser.Keyboard.O);
    
	if (Ekey.isDown)				// When E is pressed / Shoot Button
    {
        
        Shoot(player1, player1_dir);
        console.log("Shooting");

    }
    
    if (Okey.isDown)                // When E is pressed / Shoot Button
    {
        
        Shoot(player2, player2_dir);
        console.log("Shooting");

    }
}

function Shoot(player,playerDir){

    var shoot_playerDir = playerDir;
    switch(shoot_playerDir){
        case 'left':
        createBullet(player);
        break;
        case 'right':
        createBullet(player);
        break;
        case 'up':
        createBullet(player);
        break;
        case 'down':
        createBullet(player);
        break;

    }
}
function createBullet(player){
    if(player == player1){
    var bullet = p1bullets.create(player1.x, player1.y, 'star');
    }
    if(player == player2){
    var bullet = p2bullets.create(player2.x, player2.y, 'star');
    }
}

