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
/* ___________________enemy object ___________________*/
let allEnemies = [];
let Enemy = function(x, y, speed) {
    this.x = (Math.floor(Math.random() * (1000)) + 2);
    this.y = y;
    this.speed= speed;
    this.sprite = 'images/enemy-bug.png';
    
};

Enemy.prototype.update = function(dt) {
   
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*________________________instantiate enemy object ______________*/
enemy01 = new Enemy(0, 60,150);
enemy02 = new Enemy(0,226, 80 );
enemy03 = new Enemy(0, 143, 90);
allEnemies.push(enemy01);
allEnemies.push(enemy02);
allEnemies.push(enemy03);

/*_________________________ Player object ___________________*/
class player {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-pink-girl.png'  
    }
    update(dt) {
   
    }
    handleInput(){

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

















/* _________________________Add event listener _______________*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
