var player;
var obstacle, obstacle2
var edges;
var foodGroup;
var obstacleGroup;
var life1, life2, life3;
var player_Image, playerLeft_Image, playerRight_Image, playerDown_Image;
var food_image, asteroid_Image1, asteroid_Image2, asteroid_Image3;
var life1_Image, life2_Image, life3_Image;
var score = 0;
var lifeCount = 3;
var enemyShooter, enemyGroup;
var enemy_Image;
var pointGroup;
var bulletGroup;
var bullet2Group;
const play =  1;
const end = 2;
var gameState = 1;
var bullet_Image, bullet_sound;
var bg_image;
var obstacle2Group;
var point2Group;
var gameOver, go, replay, r_image;
var power, power_Image;
var angle;
var astroid3_image, planet_image1;
var enemyLife = 250;
var bullet2_Image;
var dScore = 0;
var direction = 0;

function preload(){
  player_Image = loadImage("Images/player.png");
  playerLeft_Image = loadImage("Images/playerLeft.png");
  playerRight_Image = loadImage("Images/playerRight.png");
  playerDown_Image = loadImage("Images/playerDown.png");

  food_Image = loadImage("Images/food.png");
  asteroid_Image2 = loadImage("Images/asteroidGrey2.png");
  asteroid_Image3 = loadImage("Images/asteroidOrange.png");

  life1_Image = loadImage("Images/life1.png");
  life2_Image = loadImage("Images/life2.png");
  life3_Image = loadImage("Images/life3.png");

  enemy_Image = loadImage("Images/enemy.png");
  bullet_Image = loadImage("Images/bullet.png")
  bullet2_Image = loadImage("Images/bullet2.png")

  soundFormats('mp3', 'ogg');
  bullet_sound = loadSound('gunsound.mp3')

  bg_image = loadImage("Images/space.png");
  gameOver = loadImage("Images/over.png");
  r_image = loadImage("Images/replay.png");
  power_Image = loadImage("Images/gem.png");
  astroid3_image = loadImage("Images/asteroid3.png");
  planet_image1 = loadImage("Images/planet1.png");


}

function setup() {
  createCanvas(windowWidth, windowHeight);

  edges = createEdgeSprites();

  foodGroup = new Group();
  obstacleGroup = new Group();
  enemyGroup = new Group();
  pointGroup = new Group();
  point2Group = new Group();
  bulletGroup = new Group();
  bullet2Group = new Group();
  obstacle2Group = new Group();


  player = createSprite(windowWidth/2,windowHeight/2,20,20);
  player.addImage(player_Image);

  life1 = createSprite(windowWidth-105, windowHeight/13,20,20);
  life1.addImage(life1_Image);
  life1.scale = 0.7;
  life2 = createSprite(windowWidth-70, windowHeight/13,20,20);
  life2.addImage(life2_Image);
  life2.scale = 0.7;
  life3 = createSprite(windowWidth-35, windowHeight/13,20,20);
  life3.addImage(life3_Image);
  life3.scale = 0.7;

  enemyShooter = createSprite(10,30, 10,10);
  enemyShooter.addImage(enemy_Image);
  enemyShooter.scale = 0.1;
  enemyShooter.velocityX = 3.5;
  enemyShooter.visible = false;

  go = createSprite(windowWidth/2-50, windowHeight/2-120,20,20);
  go.addImage(gameOver);
  go.scale = 0.7;
  go.visible = false;
   
  replay = createSprite(windowWidth/2-50, windowHeight/2,20,20);
  replay.addImage(r_image);
  replay.scale = 0.5;
  replay.visible = false;
  
  power = createSprite(random(windowWidth), random(windowHeight), 20,20);
  power.visible = false;
  power.addImage(power_Image);
  power.scale = 0.1;

}

function draw() {
  background(bg_image);

  if(gameState===1){

    bullet2();

    if(keyDown(UP_ARROW)){  

      player.rotation=0;
      player.addImage(player_Image); player.setSpeed(7,-90);

     } 

    if(keyDown(LEFT_ARROW)){ 
      player.rotation=-90;
      player.velocityX = -7;
      player.velocityY = 0;
     }

     if(keyDown(DOWN_ARROW)){
        player.rotation=180;
        player.velocityY = 7;
        player.velocityX = 0;
     } 

     if(keyDown(RIGHT_ARROW)){ player.rotation=90;
      player.velocityX = 7;
      player.velocityY = 0;
     }



  player.bounceOff(edges);

  
  if(score===2){
   power.visible = true;
  }
  if(player.isTouching(power)){
    power.visible = false;
    dScore = 350;
    power.y = windowHeight/2-600;
  }
  if(frameCount%10===0){
     dScore = dScore-10;
  }
 console.log(dScore); 


  if(pointGroup.isTouching(player)||point2Group.isTouching(player)||bulletGroup.isTouching(player)||enemyShooter.isTouching(player)){
     lifeCount = lifeCount-1;
     player.velocityX = 0;
     player.velocityY = 0;
     player.x = windowWidth/2;
     player.y = windowHeight/2;
     player.addImage(player_Image);
     pointGroup.destroyEach();
  } 

  bullets();

  if(bullet2Group.isTouching(enemyShooter)){
    enemyLife = enemyLife -5;
   }


  if(lifeCount===2){
    life3.visible = false;
  }
   else if(lifeCount===1){
     life2.visible = false;
   }
   else if(lifeCount===0){
     life1.visible = false;
   }


  for (var i = 0; i < foodGroup.maxDepth(); i++) {
    if(foodGroup.get(i) != null  && player.isTouching(foodGroup.get(i)) ){
      foodGroup.get(i).destroy();
      score++;
    }}

  obstacles();
  obstacles2();
  food();


  if(score>1){
    enemyShooter.visible = true;
  }
  if(enemyLife<0){
   enemyShooter.visible = false;
  }

  enemyShooter.bounceOff(edges);
  

  if(lifeCount===0){
    player.visible = false;
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    gameState = 2;
    go.visible = true;
    replay.visible = true;
    enemyShooter.visible = false;
    bulletGroup.destroyEach();
    bulletGroup.destroyEach();
    obstacle2Group.destroyEach();
    power.visible = false;
    enemyLife = 250;
  }
}
 else if(gameState===2){
   textSize(20);
   text("SCORE : "+score, windowWidth/2-100, windowHeight/2-200);
   text("GAME OVER", windowWidth/2-100, windowHeight/2-50);
 }

 if(mousePressedOver(replay)){
   restart();
 }

  textSize(18);
  text("SCORE : "+score,windowWidth/2+650, windowHeight/2-240);

  drawSprites();
}

function restart(){
   gameState = 1;
   go.visible = false;
   replay.visible = false;
   life1.visible = true;
   life2.visible = true;
   life3.visible = true;
   score = 0;
   lifeCount = 3;
   player.visible = true;
   power.visible = false;
   dScore = 0;
   power.visible = true ;
  
   
}

function obstacles(){
  if(frameCount%120===0){
    var rand = Math.round(random(1,2));
    obstacle = createSprite(-10, random(0,windowHeight),20,20)

    if(rand===1){
      obstacle.x = windowWidth+400;
      obstacle.velocityX = -3;
    }
    else if(rand===2){
      obstacle.x = random(0,50);
      obstacle.velocityX = 3
    }

    var rand2 = Math.round(random(1,4));

    
     if(rand2===1){
      obstacle.addImage(asteroid_Image2);
      obstacle.scale = 0.5;
    }
    else if(rand2===2){
      obstacle.addImage(asteroid_Image3);
      obstacle.scale = 0.5;
    }
    else if(rand2===3){
      obstacle.addImage(astroid3_image);
      obstacle.scale = 0.2;
    }
    else if(rand2===4){
      obstacle.addImage(planet_image1);
      obstacle.scale = 0.2;
    }
    

    obstacleGroup.add(obstacle);

    var point = createSprite(0, 0, 1,1);
    point.velocityX = obstacle.velocityX;
    point.x = obstacle.x;
    point.y = obstacle.y;
    point.depth = obstacle.depth +1;
    pointGroup.add(point);
  }

}
function food(){
  if(frameCount%80===0){
     var food = createSprite(random(10,windowWidth),random(10,windowHeight),10,10);
     food.addImage(food_Image);
     food.scale = 0.5;
     food.setCollider("circle")
     foodGroup.add(food);
  }
}

function bullets(){
  if(score>2 && frameCount%25===0){
    var bullets  = createSprite(enemyShooter.x, enemyShooter.y, 10,10);
    bullets.addImage(bullet_Image);
    bullets.scale = 0.1;
    bullets.velocityX = 0;
    bullets.velocityY = 17;
    bullet_sound.play();
    bulletGroup.add(bullets);
    
    if(enemyLife<0){
      bullets.visible = false;
      bullet_sound.stop();
     }
   }
}
function obstacles2(){
  if(frameCount%120===0){
    var rand = Math.round(random(1,2));
    obstacle2 = createSprite(random(0,windowWidth),0 ,20,20)

    if(rand===1){
      obstacle2.y = windowHeight/2+500;
      obstacle2.velocityY = 3;
    }
    else if(rand===2){
      obstacle2.y = 0;
      obstacle2.velocityY = 3
    }

    var rand2 = Math.round(random(1,4));

    if(rand2===1){
      obstacle2.addImage(asteroid_Image2);
      obstacle2.scale = 0.5;
    }
    else if(rand2===2){
      obstacle2.addImage(asteroid_Image3);
      obstacle2.scale = 0.5;
    }
    else if(rand2===3){
      obstacle2.addImage(astroid3_image);
      obstacle2.scale = 0.2;
    }
    else if(rand2===4){
      obstacle2.addImage(planet_image1);
      obstacle2.scale = 0.2;
    }
    obstacle2Group.add(obstacle2);

    var point2 = createSprite(0, 0, 1,1);
    point2.velocityY = obstacle2.velocityY;
    point2.x = obstacle2.x;
    point2.y = obstacle2.y;
    point2.depth = obstacle2.depth +1;
    point2Group.add(point2);
  }

}
function bullet2(){
  if(score>1 && frameCount%10===0 && keyDown("SPACE") && dScore>0){
    var bullets  = createSprite(player.x, player.y, 10,10);
    bullets.addImage(bullet2_Image);
    bullets.scale = 0.1;
    bullets.velocityX = 0;
    bullets.velocityY = -15;
    bullet_sound.play();
    bullet2Group.add(bullets); 
   }
}
