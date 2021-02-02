  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  var monkey , monkey_running, monkey_stop;
  var bananaImage, obstacleImage;
  var FoodGroup, obstacleGroup;
  var background, backImg;



function preload(){
  
  //inserting background image
  backImg= loadImage("jungle.jpg");
  
  //loading monkey animations 
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  //loading banana image
    bananaImage = loadImage("banana.png");
  //loading obstacle image
    obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(800, 400);
  
  
  //creating background and adding image
  background= createSprite(0,0,800,400);
  background.addImage(backImg);
  background.scale=1.5;
  //making moving background
  background.x=background.width/2;
  background.velocityX=-4;
  
  //creating monkey
   monkey=createSprite(80,315,10,10);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1;
  
  //creating invisible ground
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible = false;

  //creating groups for food and obstacle
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  //score
  score = 0;
 
  
}


function draw() {
  
    
  if(background.x<0) {
    background.x=background.width/2;
  }
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
   
  
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18 ;
                break;
        default: break;        
      }
  
  //giving movement to monkey br "space" key
    if(keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();

    if(obstaclesGroup.isTouching(monkey)){ 
          monkey.scale=0.08;
       // score=score-2;
      }
  
  drawSprites();
  
  //displaying score
  stroke("black");
  strokeWeight(2);
  textSize(20); 
  fill("white");
  text("Score: "+ score, 150,70);        
  
  
    // if(obstaclesGroup.isTouching(monkey)){
    // ground.velocityX = 0;
    // monkey.velocityY = 0;
    // obstaclesGroup.setVelocityXEach(0);
    // FoodGroup.setVelocityXEach(0);
    // obstaclesGroup.setLifetimeEach(-1);
    // FoodGroup.setLifetimeEach(-1);
    // monkey.changeAnimation("moving",sprite_0.png);
    // monkey.scale=0.1;
    // }
}
//spawning food in intervals
function spawnFood() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(600,200,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}
//spawing obstacle in intervals 
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.setCollider("circle",0,0,100);
    obstacle.debug=false;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;    
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
