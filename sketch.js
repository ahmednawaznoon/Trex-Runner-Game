
var PLAY=1, END=0, gameState = PLAY
var obstaclesGroup, cloudsGroup
var trex, trex_running, trex_collided, edges;
var groundImage;
var ground;
var invisibleGround;
var cloud;
var cloudImage;
var gameOver, gameOverImage
var restart, restartImage
var score = 0;
var checkPointSound, dieSound, jumpSound
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  restartImage = loadImage("restart.png")
  gameOverImage = loadImage("gameOver.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  checkPointSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3")

}

function setup(){
  createCanvas(600,200);


  
  obstaclesGroup = new Group ();
  cloudsGroup = new Group();
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided)
  edges = createEdgeSprites();
  // trex.setCollider("rectangle",0,0,400,trex.height);
  //trex.debug = true;
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  
  ground = createSprite(300,180,600,20);
  ground.addImage(groundImage);
  
  invisibleGround = createSprite(300,195,600,20);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
}


function draw(){
  

  
  //set background color 
  background("white");
  text("Score: "+score,500,40)

  
  if (gameState === PLAY) {
    ground.velocityX = -( 5+2*score/100);
    score = score+Math.round(getFrameRate()/60);
    if (score > 0 && score%100===0) {
      checkPointSound.play();
    }
    
    createClouds();
    createObstacles();

  
       //jump when space key is pressed
       if(keyDown("space") && trex.y >= 160 ) {
       trex.velocityY = -10;
       jumpSound.play();
        
    
           }
    
        trex.velocityY = trex.velocityY + 0.5;
  

       if (ground.x < 0) {
         ground.x = ground.width/2
            
      }
        
      if (trex.isTouching(obstaclesGroup)) {
        gameState = END
       dieSound.play();
        ground.velocityX = 0;
      
      }
    
    
  }
  
  else if (gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0); 
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
    gameOver.visible = true;
    restart.visible = true;
        if (mousePressedOver(restart)) {
    //console.log ("hello")
    restart1();
     }
  }
  
  
  var rand = Math.round (random(1,10))
  //console.log (rand)
  
  //logging the y position of the trex
  console.log(trex.y)
  

  
  //console.log (frameCount);
  

  
  //stop trex from falling down
  trex.collide(invisibleGround);
  

  
  drawSprites();
 
 // text (getFrameRate(),500,100)
 // text (frameCount,400,100)
  
}
  

function restart1() {
  gameState = PLAY
  gameOver.visible = false;
  restart.visible = false;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  trex.changeAnimation("running")
  score = 0
  
}

function createClouds () {
  if (frameCount%80===0) {
    //console.log (frameCount)
    cloud = createSprite(600,20,20,20)
    cloud.y = random(0,60)
    cloud.addImage(cloudImage)
    cloud.scale = random (0.4,0.8)
    cloud.velocityX = -2
    cloud.depth = trex.depth 
    trex.depth = trex.depth + 1
    cloudsGroup.add(cloud)
    //console.log ("trex" + trex.depth)
    //console.log ("cloud" + cloud.depth)
    
  }
}

function createObstacles () {
  if (frameCount%60===0) {
    obstacle = createSprite(600,160,20,20)
    obstacle.velocityX = -( 5+2*score/100);
    var rand = Math.round(random(1,6))
    switch(rand) {
        case 1: obstacle.addImage(obstacle1);
        break;
   
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6);
        break;
         
    }
    
    obstaclesGroup.add(obstacle);
    
    obstacle.scale = 0.5
    obstacle.lifetime = 120
    
  }
  
  
}
  
  
  
