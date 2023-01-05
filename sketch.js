var PLAY = 1
var END = 0
var score = 0
var gameState = PLAY
var car, car_driving, car_collided
var edges
var road
var roadImage
var gameOverjpg, restartjpg
var cloudImage
var cloud
var barrier
var cloudGroup, barrierGroup
var gamOver, restart

function preload(){
car_driving = loadAnimation("car.png")
car_collided = loadAnimation("car_collided.png")
roadImage = loadImage("road.png")
cloudImage = loadImage("cloud.png")
barrier = loadImage("barrier.png")
gameOverjpg = loadImage("gameover.jpg")
}

function setup() {
 createCanvas(1200,300)
 car = createSprite(100,180,50,50)
 car.addAnimation("driving",car_driving)
 car.addAnimation("collided",car_collided)
car.velocityX = (6 + 2*score/150 )

 //car.scale = 0.1
road = createSprite(100,150,)
road.addImage(roadImage)
//road.scale = 0.1
road.velocityX = -5;
invisibleGround = createSprite(300,190,600,10)
invisibleGround.visible = false
edges = createEdgeSprites()    
barrierGroup = new Group()
cloudGroup = new Group()
gameOver = createSprite(650,150);
gameOver.addImage(gameOverjpg);
gameOver.scale = 0.8;
gameOver.visible = false;
}

function draw() {
    drawSprites()
    text ("score:" + score,500,50)
 console.log(gameState)
 
 if (gameState === PLAY) {
    road.velocityX = -(6 + 2*score/150)
    score = score+Math.round(getFrameRate()/50)
 
    car.mouseX = World.mouseX
    edges= createEdgeSprites();
   car.collide(edges);
 }
 if(road.x < 0){
  road.x = width/2;
}
 
 if (keyDown("space")&& car.isTouching(road)) {
car.velocityY=-12    
 }
car.velocityY+=0.8



  spawnCloud()
  spawnbarrier()

if (barrierGroup.isTouching(car)) {
 gameState = END 
 car.velocityY = 0
 car.addAnimation("collided",car_collided)   
}
 
else if(gameState == END){
    car.velocityX = 0
    road.velocityX = 0

barrierGroup.setVelocityXEach(0)
cloudGroup.setVelocityXEach(0)
barrierGroup.setLifetimeEach(-1)
cloudGroup.setLifetimeEach(-1) 
car.changeAnimation("collided")
}


car.collide(invisibleGround)



}

function spawnCloud(){
 if (frameCount%60 == 0) {
    

cloud = createSprite(600,100,40,10)
cloud.velocityX = -3
cloud.addImage("cloud",cloudImage)
//cloud.depth = car.depth
//car.depth += 1
cloud.scale = 0.4
cloud.y = random(50,100)
cloud.setLifetime = 600
cloudGroup.add(cloud)
 }

}

function spawnbarrier(){
    if (frameCount%60 == 0) {
      var barrier = createSprite(600,165,10,40)
  barrier.velocityX = -6
  var ran = Math.round(random(1,6))
barrier.addImage("barrier",barrier)
   
  console.log(ran)
  barrier.scale = 0.5
  barrier.lifetime = 600
  barrierGroup.add(barrier)
    }
}
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    car.addAnimation("driving", car_driving);
  }


  
    
   
