var basketballBack
var basketHoop
var Score
var bBall
var dreidels = []
var ballX, ballY;
var hoopX, hoopY;
var position, velocity, gravity;
// var startPosition, endPosition;
var storeY,storeX;
var showLine = false;
var didScore = false;
var dreidels = [];



function preload(){
  basketballBack = loadImage("basketballBack.jpg")
  basketHoop = loadImage("hoop.png")
  bBall = loadImage("bBall.png")
  Score = loadImage("Score.jpg")
  dreidelImg = loadImage("dreidel.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  hoopX = width - 200;
  hoopY = 400;
  for (var i = 0; i < 20; i++) {
    dreidels[i] = new Dreidel();
  }


  position = createVector(0, 0);
  velocity = createVector(0, 0);
  gravity = createVector(0, 0.1);
}

function draw() {
  if(didScore == false) {
    background(basketballBack)
    image(basketHoop, hoopX, hoopY, 100, 100)
    ball()
    checkScore()
    youScored()
    // Click()
    // Release()
    moveBall()
    if(showLine){
      line(storeX,storeY,mouseX,mouseY)

    }
  }
  else {
    scoreScreen()
  }
}

function displayDreidels() {
  for(var i = 0; i < dreidels.length; i++){
  dreidels[i].display();
}
}

function mousePressed(){


  if(didScore == true){
    didScore = false
    position.x = 0
    position.y = 0
  }

  storeY = mouseY;
  storeX = mouseX;
  showLine = true;

}

function mouseClicked(){

}


function ball(){
  if(mouseIsPressed){
    image(bBall,position.x, position.y, 60,60)
  }
  else {
    image(bBall,  position.x, position.y, 60,60)
  }
}

function checkScore() {
  var dis = sqrt((position.x- hoopX)*(position.x - hoopX) + (position.y - hoopY)*(position.y-hoopY));

  if (dis < 70) {
    return true;
  }
  return false;
}
function youScored(){
  if(checkScore() == true){
    didScore = true;

  }

}

function scoreScreen() {
  background(Score)
  textSize(80)
  text('YOU SCORED!!', 300,200);
  fill(100,255,0)
  displayDreidels();
}

function Dreidel() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.display = function() {
    image(dreidelImg, this.x, this.y, dreidelImg.width*.2, dreidelImg.height*.2);
    this.x-=3;
    if(this.x < 0) this.x = width;
  }
}

function mouseClicked() {
  startPosition = createVector(mouseX, mouseY);
  position = createVector(mouseX, mouseY);
}
function mouseReleased() {
  showLine = false;
  var angle = atan2(storeY - mouseY, storeX - mouseX / 2)
  var speed = sqrt((mouseY - storeY)*(mouseY - storeY) + (mouseX - storeX)*(mouseX - storeX))/20
  velocity = createVector(speed * cos(angle), speed*sin(angle));

}

function moveBall() {
  position.add(velocity);
  velocity.add(gravity);
  // ellipse(position.x, position.y, 50)
}
