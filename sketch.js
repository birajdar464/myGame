var bgImage,bg;
 var earth,earthImg;
var rocket, rocketImg
var asteroid,asteroidImg;
var life ,lifeImg;
var heart1,heart2,heart3;
var spaceStation, spaceStationImg;
var coin, coinImg;
var score= 0;
var coinGroup;
var astGroup;
var spaceStGroup;
var fuel,fuelImg;
var fuel1,fuel2, fuel3;
var fuel =0
var life =3
var gameState ="wait";
var startButton, startButtonImg;
var restart,restartImg
var gameOver, gameOverImg
var bgMusic



function preload(){
  bgImage= loadImage("images/bg2.jpg")
  earthImg = loadImage("images/earthGif.gif")
  rocketImg= loadImage("images/rocket.png")
  asteroidImg = loadImage("images/asteroid.png")
  lifeImg = loadImage("images/heart.png")
  spaceStationImg = loadImage("images/space.png")
  coinImg = loadImage("images/coin.png");
  fuelImg =loadImage("images/fuel.png");
  restartImg =loadImage("images/restart.png");
  gameOverImg =loadImage("images/gameOver.png")
  startButtonImg =loadImage("images/start.png")
  bgMusic = loadSound("music.mp3.mp3")
}

function setup(){
  
  createCanvas(1500,1000 );
  bg=createSprite(200,0,3000,1000);
  bg.scale= 2.5;
  bg.addImage("background",bgImage)
 // bg.velocityX=-1

 startButton=createSprite(700,400)
 startButton.scale=0.2
 startButton.addImage("start",startButtonImg)
 
 restart= createSprite(600,400)
 restart.addImage("reset",restartImg)
 restart
 restart.visible =false

 gameOver =createSprite(600,300)
 gameOver.addImage("end",gameOverImg)
 gameOver.visible=false;

  earth=createSprite(700,1100,100,100)
  earth.addImage("revolvingEarth",earthImg);
  earth.scale= 5;
  //console.log(windowWidth)
  //console.log(windowHeight)

  rocket =createSprite(700,600,10,10)
  rocket.addImage("movingRocket",rocketImg)
  rocket.scale=1;

  heart1= createSprite(100,100,100,100)
 heart1.addImage("life1",lifeImg)
heart1.scale= 0.15

  heart2= createSprite(170,100,100,100)
  heart2.addImage("life2",lifeImg)
  heart2.scale= 0.15
  


  heart3 =createSprite(240,100,100,100)
  heart3.addImage("life3",lifeImg)
heart3.scale= 0.15

fuel1 =createSprite(1300,100,100,100)
fuel1.addImage("fuel1",fuelImg)
fuel1.scale = 0.3
fuel1.visible =false;

fuel2 =createSprite(1350,100,100,100)
fuel2.addImage("fuel2",fuelImg)
fuel2.scale = 0.3
fuel2.visible =false;

fuel3 =createSprite(1400,100,100,100)
fuel3.addImage("fuel3",fuelImg)
fuel3.scale = 0.3
fuel3.visible =false;


coinGroup =new Group();
astGroup = new Group();
spaceStGroup = new Group();

bgMusic.play()
}

function draw() {
  background("white");
 
 if(gameState=== "play"){
  if(bg.x<0){
    bg.x=width/2
  }

  if(keyDown(LEFT_ARROW)){

    rocket.x= rocket.x-7;
  }
  
  if(keyDown(RIGHT_ARROW)){

    rocket.x= rocket.x+7;
  }

  if(rocket.isTouching(coinGroup)){
    score = score+10
    coinGroup.destroyEach();
  }


  if(rocket.isTouching(spaceStGroup)){
fuel = fuel+1;
spaceStGroup.destroyEach();
if ( fuel===1 ){
  fuel1.visible= true;
}

if ( fuel===2 ){
  fuel2.visible= true;
}

if ( fuel===3){
  fuel3.visible= true;
  score=score+50;
  gameState="win"
}


  }

  if( rocket.isTouching(astGroup)){
    life =life-1
    astGroup.destroyEach();

    if(life=== 2){
      heart3.visible =false;
    }
     if(life=== 1){
      heart2.visible =false;
    }
    if(life=== 0){
      heart1.visible =false;
      gameState="end"
    }
  }

startButton.visible=false;

  
spawnCoin();
  spawnAsteroid();
  spawnSpaceStation();
}
  drawSprites();
  textSize(30)
 fill("white")
 text("score :"+ score,100,170)

 if(gameState=== "wait"){
 text("Instuctions For the Game :",500,200)
 text("1.To get the fuel..Try to cacth the space station.",500,250)
 text("2.To increase your score..Try to gain coins.",500,300)
 text("3.If you touch the asteroid...then your life will decrease.",500,350)
 
 
if(mousePressedOver(startButton)){
  gameState="play"
  

}

 }

 if (gameState=== "win"){
 text("YOU ARE THE WINNER", 600,200)
 life =0
 heart1.visible=false
  heart2.visible=false
  heart3.visible=false
  restart.visible= true





 }
 if(gameState=== "end"){
  restart.visible= true;
  gameOver.visible=true;
  if(mousePressedOver(restart)){
    gameState="wait"
    restart.visible= false;
  gameOver.visible=false;
  startButton.visible=true;
  life=3;
  score=0;
  fuel=0;
  heart1.visible=true
  heart2.visible=true
  heart3.visible=true
 
  fuel1.visible =false
 fuel2.visible =false
  fuel3.visible =false
    
  }
 }
}
 
function spawnAsteroid(){
if(frameCount% 50 ===0){
asteroid = createSprite(500,100,10,10)
astGroup.add(asteroid)
asteroid.addImage("obstacles", asteroidImg)
asteroid.scale= 0.25;
asteroid.velocityY = 10
asteroid.x =Math.round(random(100,1400))
}



}

function spawnSpaceStation(){
  if(frameCount% 200 ===0){
    spaceStation = createSprite(500,100,10,10)
    spaceStGroup.add(spaceStation)
    spaceStation.addImage("fuel", spaceStationImg)
    spaceStation.scale= 0.28;
    spaceStation.velocityY = 15
    spaceStation.x =Math.round(random(100,1400))
    }




}
function spawnCoin(){
  if(frameCount% 100 ===0){
    coin = createSprite(100,100,10,10)
    coinGroup.add(coin);
    coin.addImage("money", coinImg)
    coin.scale= 0.2;
    coin.velocityY = 5
    coin.x =Math.round(random(100,1400))
    }




}