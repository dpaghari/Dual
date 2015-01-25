
function bossShoot(){

    var shoot = game.add.audio('shoot', .001, false);

    //see here: http://docs.phaser.io/Keyboard.js.html for the keycodes
    shoot.loop = false;
    shoot.play();
    shoot.totalDuration = .2;
    //Shoot();
    console.log("Boss Shooting");
	var bulletSpeed = 800;
	var xPos = game.world.width * Math.random();
	var yPos = boss.y;
    var bullet = bossBullets.create(xPos, yPos, 'bullet');
    bullet.body.velocity.y += bulletSpeed;
}

function Shoot(){
    createBullet();
}

function createBullet(){

    var bulletSpeed = 800;
	var xPos = game.world.width * Math.random();
	var yPos = boss.y;
    var bullet = bossBullets.create(xPos, yPos, 'bullet');
    bullet.body.velocity.y -= bulletSpeed;
       
}
