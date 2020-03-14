var worldSize;
var margin;
var grid;
var next;
var inventory;
var resolution =50;
var inColor = false;

var buttons = [];



var numberOfTurns;
var whosTurn = 0;
var counter = 60;
var decision = 0;
var howManyMovesLeft = 2;
var choosingDirection = false;
var boardWidth = 0;

var GameOfLifeFrameRate = 3;



function preload() {
  img = loadImage('Images/JaredStanding.png');
  img2 = loadImage('Images/JennaStanding.png');
  img3 = loadImage('Images/JarrettStanding.png');
  img4 = loadImage('Images/Zombie.png');
  img5 = loadImage('Images/ammo.png')

  song = loadSound('Sounds/Gun 05_shoot.wav');
  ouch = loadSound('Sounds/Ed_Attack_1.wav');
  ladyOuch = loadSound('Sounds/Julie_Jump_3.wav');
  drunkGuyOuch = loadSound('Sounds/Mike_Death_15.wav');
  outOfAmmo = loadSound('Sounds/Gun 02_reload.wav');
  moltovSound = loadSound('Sounds/Impact_02.wav');

}


function setup() {



  //song.setVolume(0.5);

  worldSize = createVector(1000, 500);
  margin = createVector(800, 300);
  createCanvas(worldSize.x + margin.x, worldSize.y+ margin.y);
  boardWidth = 2*(worldSize.x);
  buttonSetup();


  grid = make2DGrid(worldSize.x/resolution, worldSize.y/resolution);
  inventory = make2DGrid(3, 3);
  next = grid;

  neighborhood = new Range(-1, -1, 1, 1);

  ammo.push(new Ammo(0,0));
  tanks.push(new Tank(3,3));
  tanks.push(new Tank(5,4));
  tanks.push(new Tank(3,6));

  robots.push(new Robot(6, 3));
  robots.push(new Robot(8, 3));
  robots.push(new Robot(10, 6));
  robots.push(new Robot(6, 4));
  numberOfTurns = tanks.length + robots.length;

}



function draw() {
  background(20);
  theDrawFunction();

  for(var i = 0; i < tanks.length; i++){
    tanks[i].display();
  }

  for(var i = 0; i < robots.length; i++){
    robots[i].update();
    robots[i].display();
  }


  controls();
  drawDecisionTree();
  debugMode();


  if(tanks[0].alive){
    image(img, tanks[0].pos.x * resolution, tanks[0].pos.y * resolution - resolution*1.5);
  }
  if(tanks[1].alive){
    image(img2, tanks[1].pos.x * resolution, tanks[1].pos.y * resolution - resolution*1.5);
  }
  if(tanks[2].alive){
    image(img3, tanks[2].pos.x * resolution, tanks[2].pos.y * resolution - resolution*1.5);
  }

  for(var i = 0; i < robots.length; i++){
    image(img4, robots[i].pos.x * resolution, robots[i].pos.y * resolution - resolution*1.5);
  }
  bloodParticlesUpdate();

  for(var i = tanks.length-1; i >=0; i--){
    if(tanks[i].health <=0){
      tanks[i].alive = false;
    }
  }
  for(var i = 0; i < ammo.length; i++){
    ammo[i].display();
  }
}

function theDrawFunction(){
  if(counter>0){
    counter--;
  }
  if(GameOfLifeFrameRate ==0){
    GameOfLifeFrameRate=4;
  }
  if(GameOfLifeFrameRate > 0){
    GameOfLifeFrameRate--;
  }


  drawingMarginBackground();
  drawingTankNamesAndHealth();
  drawInventory();
  drawTheGrid(worldSize.x/resolution, worldSize.y/resolution);
  for(var i = 0; i < grid.length; i++){
    for(var j = 0; j < grid[i].length; j++){
      grid[i][j].display();
    }
  }



  for(var i = 0; i < buttons.length; i++){
    buttons[i].update();
  }
  if(paused==false && GameOfLifeFrameRate == 0){

    next = make2DGrid(worldSize.x/resolution, worldSize.y/resolution);
    commandDraw();
    grid=next;
  }


}

function drawingMarginBackground(){
  push();
  fill("grey");
  rect(0, worldSize.y+10, worldSize.x, margin.y);
  stroke("white");
  strokeWeight(6);
  noFill();
  rect(buttons[selectedTool].position.x, buttons[selectedTool].position.y, buttons[selectedTool].size.x, buttons[selectedTool].size.y);
  pop();
}

function drawTheGrid2(columns, rows){
  for(var i=0; i < columns; i++){
    for(var j = 0; j < rows; j++){
        fill(180);
        rect(i*resolution, j*resolution, resolution-1, resolution-1);
    }
  }
}

function drawInventory(){
  push();
  for(var i=0; i < 4; i++){
    for(var j = 0; j < 4; j++){
        fill("orange");
        rect(300+ i*resolution, worldSize.y +50 + j*resolution, resolution-1, resolution-1);
    }
  }
  pop();
}

function drawingTankNamesAndHealth(){
  push();
  for(var i = 0; i < tanks.length; i++){
    textSize(18);
    if(i===whosTurn){
      stroke('blue');
      strokeWeight(5);
    } else {
      stroke('black');
      strokeWeight(1);
    }
    rect(i*150, worldSize.y+10, 140, 30);

    push();
    noStroke();
    fill("black");
    text("TANK: " + i, i*150, worldSize.y+35);
    text("HP: " + tanks[i].health, i*150 + 80, worldSize.y+35);
    pop();
  }
  pop();

}

function controls(){
  if(tanks.length > 1 && whosTurn < tanks.length-1 && tanks[whosTurn].alive==false){
    whosTurn++;
  }

  if(whosTurn>tanks.length + robots.length - 1){
    whosTurn=0;
  }

  if(whosTurn < tanks.length){
      if(counter===0 && choosingDirection===false){
        if(keyIsDown(83) && decision < 3){//S Key, DOWN
          decision++;
          counter=20;
        }
        if(keyIsDown(87) && decision > 0){//W Key, UP
          decision--;
          counter=20;
        }




        if(keyIsDown(13) && decision===0){//ENTER
          moveTanks();
          choosingDirection = true;
          counter=20;
          decision=0;
        }

        if(keyIsDown(13) && decision===1){//ENTER
          tanksPickup();
          counter=20;
          decision=0;
        }

        if(keyIsDown(13) && decision===2){//ENTER
          if(tanks[whosTurn].ammo>0){
            aimTanks();
            choosingDirection = true;
            counter=20;
            decision=0;
          } else {
            outOfAmmo.play();
            counter=20;
            decision=0;
            howManyMovesLeft--;
          }
        }

        if(keyIsDown(13) && decision===3){//ENTER
          aimSpecial();
          choosingDirection = true;
          counter=20;
          decision=0;

        }
      }
  }





  if(howManyMovesLeft<=0){
    whosTurn++;
    if(whosTurn>tanks.length-1 && whosTurn<=tanks.length + robots.length - 1){
      robots[whosTurn-tanks.length].whichActionToPerform=0;
      counter=60;
    }
    howManyMovesLeft=2;
  }
}

function drawDecisionTree(){
  if(whosTurn<tanks.length){
    if(choosingDirection===false){
      push();
      for(var i = 0; i < 4; i++){
        if(decision===i){
          stroke('blue');
          strokeWeight(5);
        } else {
          stroke(0);
          strokeWeight(1);
        }
        rect(0, worldSize.y+10 + 40 + i*45, 120, 40);
      }
      pop();
      push();
      fill("black");
      text("Move", 10, worldSize.y+10 + 70 + 0*45);
      text("Pickup", 10, worldSize.y+10 + 70 + 1*45);
      text("Fire", 10, worldSize.y+10 + 70 + 2*45);
      text("Special", 10, worldSize.y+10 + 70 + 3*45);
      pop();
    }
  }
}

function debugMode(){
  var debugPosition = createVector(worldSize.x +20 , 20);
  push();
  rect(debugPosition.x - 10, debugPosition.y, 300, 200);
  strokeWeight(0);
  stroke("black");
  fill("black");
  text("Decision: " + decision, debugPosition.x, debugPosition.y + 50);
  text("Who's Turn is it: " + whosTurn, debugPosition.x, debugPosition.y + 70);
  text("How Many Moves Left: " + howManyMovesLeft, debugPosition.x, debugPosition.y + 90);
  text("ChoosingDirection: " + choosingDirection, debugPosition.x, debugPosition.y +130);
  text("Counter: " + counter, debugPosition.x, debugPosition.y +110);
  text("Robot Behavior: " + robots[0].behavior, debugPosition.x, debugPosition.y +150);
  pop();
}
