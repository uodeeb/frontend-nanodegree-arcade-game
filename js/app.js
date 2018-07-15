/* ____________________ Project Plan ____________________*/
/* 
A) HTML asets !--------------------------------------------!
>>>>> The game is totally built upon calling javascript 
>>>>> and HTML canvas element and 2d drawing
B) Game logic !--------------------------------------------!

                    *1* game |starts| 
                        on page load
        --------------------< >------------------                    
    <---|                                       |--->
    |---> *2(a)*                       *2(b)* <<----|
    Player char                             Enemies char
    Initial position _________________cross the canvas(loop)
------
|--->>>*3* player move when direction keys pressed 
(one step within a box each time and can not go out the canvas)
        --------------------< >------------------                    
    <---|                                       |--->
    |---> *4(a)*                       *4(b)* <<----|
player reach the other side_______player clashed with an enemy
    |---> *5(a)*                       *5(b)* <<----|
- add winner music alert    - add collision music alert
        ___                                 ___
         |                                   |
         |>>>>>>>>>>>*6*game restart>>>>>>>>>|
----------------------------------------------------
____________________________________________________
/* _________________ the real code _______________*/
/* TO-DO:___________________enemy object ___________________*/
let allEnemies = [];
let Enemy = function(x, y, speed) {
    this.x = (Math.floor(Math.random() * (1000)) + 2);
    this.y = y;
    this.speed= speed;
    this.sprite = 'images/enemy-bug.png';
    
};

Enemy.prototype.update = function(dt) {
    // TO-DO: looping enemies across the canvas
    this.x += dt * this.speed;  
        if (this.x >= 510){
        this.x = -48;
        }
    // TO-DO: build a collision rule
    playerSurroundX = player.x + 65;
    playerSurroundY = player.y + 65;
    enemySurroundX = this.x + 65;
    enemySurroundY = this.y + 65;
        if (((player.x < enemySurroundX)&&
        (playerSurroundX > this.x))&&
        ((player.y < enemySurroundY)&&
        (playerSurroundY > this.y))){
        player.x = 300;
        player.y = 300;
        // add crash music
        crashMusic.play();
        // change bg color randomly
        randomBgColor();
        // reset game after collision
        resetGame();
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*TO-DO:________________________instantiate enemy object ______________*/
enemy01 = new Enemy(0, 60,150);
enemy02 = new Enemy(0,226, 80 );
enemy03 = new Enemy(0, 143, 90);
allEnemies.push(enemy01);
allEnemies.push(enemy02);
allEnemies.push(enemy03);

/*TO-DO:_________________________ Player object ___________________*/
class player {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-pink-girl.png'  
    }
    update(dt) {
        //TO-DO: when player reach the canvas enemy-safe area >> return to initial position
        if (this.y == -48){
            this.y = 300;
            this.x = 300;
            //TO-DO: reset the game once player reach the safe side
            // add a safe arrival music
            arrivalMusic.play();
            // change bg color randomly
            randomBgColor();
            resetGame();
        }
    }
    handleInput(key){
        // TO-DO: player moves with keypresses & never leave canvas
        if (key === 'up' ){
            this.y = this.y - 87;
       
        }
        if ((key === 'down')&&(this.y < 387)){
            this.y = this.y + 87;
        }

        if ((key === 'left') && (this.x >= 50)){
            this.x = this.x - 103;
        }
        
        if ((key === 'right')&&(this.x < 403)){
            this.x = this.x + 103;
        }

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
/*TO-DO:________________________instantiate player class ______________*/
player = new player (300, 300);

/*TO-DO:________________________game reset function______________*/
resetGame = function(){
    allEnemies = [];
    enemy01 = new Enemy(0, 60,150);
    enemy02 = new Enemy(0,226, 80 );
    enemy03 = new Enemy(0, 143, 90);
    allEnemies.push(enemy01);
    allEnemies.push(enemy02);
    allEnemies.push(enemy03);
}

/*TO-DO:________________________Add music alerts______________*/

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
/*TO-DO:________________________instantiate sound object ______________*/

let bgMusic = new sound('sounds/Funny03.mp3');
let crashMusic = new sound('sounds/crashMusic.mp3');
let arrivalMusic = new sound('sounds/arrivalMusic.mp3');

/*TO-DO:____________build a random bg color function______________*/
function randomBgColor() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "radial-gradient(circle," + "rgba(" + x + "," + y + "," + z + ",0)" + "," + "rgba(" + z + "," + y + "," + x + ",1)" + ")";
    
 console.log(bgColor);
  
    document.body.style.background = bgColor;
   
    }



/*TO-DO: _________________________Add event listener _______________*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
