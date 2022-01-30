var potato, potato_running, sad_potato
var bowlImg,bowl
var tableImg,table
var gameState = "PLAY"
var gameover, restart;

var score = 0

var PLAY = 1
var END = 0

function preload(){
potato_running = loadImage ("potato.png.jpg")
sad_potato = loadImage ("sad_potato.png")
tableImg= loadImage ("table.png.jpg")
bowlImg = loadImage("bowl.png")

gameoverImg = loadImage ("gameover.png")
restartImg = loadImage ("restart.png")
}

function setup() {
 createCanvas(1200, 500)
table = createSprite(100,450);
table.addImage (tableImg);
table.velocityX = -5
table.scale = 2.5

potato = createSprite (30,150)
potato.addImage (potato_running)
potato.scale = 0.1
potato.setCollider ("rectangle",0,0,40,40,50)

gameover = createSprite (width/2, 100 ,width,125)
gameover.addImage (gameoverImg)
gameover.scale = 0.2

restart = createSprite (width/2, 385)
restart.addImage (restartImg)
restart.scale = 0.2


gameover.visible = false
restart.visible = false

bowlsGroup = new Group ()
score = 0;
}

function draw() {
background(255)
text ("Score: " + score, 25,51)
drawSprites ();
if (gameState === "PLAY") {
    
    score = score + Math.round(getFrameRate()/61)

    spawn_bowls ();

    table.velocityX = -5

    if (table.x<20) {
    table.x = width/2
}
potato.y = World.mouseY
if (potato.y < 100) {
    potato.y = 100
}
if (potato.y > 220) {
    potato.y = 220
}

if(bowlsGroup.isTouching (potato)){
    gameState = "END";
 
   
    
  }
} else if (gameState === "END") {
    gameover.visible = true;
    restart.visible = true;


    table.velocityX = 0;
    potato.velocityY = 0;
    bowlsGroup.setVelocityXEach(0);
    potato.addImage (sad_potato)
    potato.scale = 0.23
    bowlsGroup.setLifetimeEach (-1);


    if (mousePressedOver (restart)) {
        reset ();
    }
    
}
  



}
function spawn_bowls () {
    if (frameCount % 60 === 0 ) {
 var bowl = createSprite (600,150,30,40)
 bowl.y = Math.round(random(100,300))
 bowl.addImage (bowlImg);
 bowl.scale = 0.12
 bowl.depth = potato.depth
bowl.velocityX=-5


bowl.lifetime = 200

potato.depth = bowl.depth
potato.depth = potato.depth + 1

gameover.depth = bowl.depth
gameover.depth = gameover.depth + 1

bowlsGroup.add(bowl);
 }
    
}


function reset () {
    gameState = "PLAY"
    gameover.visible = false
    restart.visible = false

    bowlsGroup.destroyEach();

    potato.addImage (potato_running)
    potato.scale = 0.1

    score = 0;
}