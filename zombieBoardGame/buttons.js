var gliderDirection = 0;
var paused = true;
var selectedTool = 1;


class Button{
  constructor(name, x, y, toolNumber){
    this.name = name;
    this.position = createVector(x,y);
    this.toolNumber= toolNumber;
    this.size = createVector(60, 20);
  }

  update(){
    push();
    fill("green");
    rect(this.position.x, this.position.y, this.size.x, this.size.y);
    fill("white");
    text(this.name, this.position.x+8, this.position.y+15);
    pop();
  }
}



function playPause(){
  if(paused==false){
    paused=true;
    buttons[0].name="play"
  } else {
    paused=false;
    buttons[0].name="pause"
  }
}

function flipState(x,y){
  if(grid[x][y].alive==0){
    grid[x][y].alive=1;
  } else {
    grid[x][y].alive=0;
  }
}

function placeGlider(x, y){
  var locations = [1, -1, 1, 0, 1, 1, -1, 0, 0, 1];
  for(i = 0; i < locations.length; i+=2){
    if(gliderDirection==0){
      grid[x+locations[i]][y+locations[i+1]].alive=1;
    }
    if(gliderDirection==1){
      grid[x-locations[i]][y+locations[i+1]].alive=1;
    }
  }
}

function placeLightWeightShip(x, y){
  var locations = [-2, -1, -1, -1, 0, -1, 1, -1, -3, 0, 1, 0, 1, 1, 0, 2, -3, 2];
  for(i = 0; i < locations.length; i+=2){
    grid[x+locations[i]][y+locations[i+1]].alive=1;
  }
}

function placeMiddleWeightShip(x, y){
  var locations = [-3, 0, -2, 0, -1, 0, 1, 0, 2, 0, -3, 1, -2, 1, -1, 1, 0, 1, 1, 1, -2, 2, -1, 2, 0, 2, 0, -1, 1, -1];
  for(i = 0; i < locations.length; i+=2){
    grid[x+locations[i]][y+locations[i+1]].alive=1;
  }
}

function placeHeavyWeightShip(x, y){
  var locations = [-4, 0, -3, 0, -2, 0, -1, 0, 1, 0, 2, 0, -4, 1, -3, 1, -2, 1, -1, 1, 0, 1, 1, 1, -3, 2, -2, 2, -1, 2, 0, 2, 0, -1, 1, -1];
  for(i = 0; i < locations.length; i+=2){
    grid[x+locations[i]][y+locations[i+1]].alive=1;
  }
}

function eraser(x,y){
  for(var i = -5; i < 6; i++){
    for(var j = -5; j < 6; j++){
      grid[x+i][y+j].alive=0;
    }
  }
}

function clearGrid(){
  for(var i = 0; i < grid.length; i++){
    for(var j = 0; j < grid[i].length; j++){
      grid[i][j].alive=0;
    }
  }
}

function deselectEntireGrid(){
  for(var i = 0; i < grid.length; i++){
    for(var j = 0; j < grid[i].length; j++){
      grid[i][j].selectable=0;
    }
  }
}

function showMovementOptions(x, y){
  //var locations = [1, -1, 1, 0, 1, 1, -1, 0, 0, 1];
  for(var i = -2; i < 3; i++){
    for(var j = -2 + abs(i); j < 3 - abs(i); j++){
      if(grid[x+i]!=null && grid[x+i][y+j]!=null){
        if(grid[x+i][y+j].isObstacle==0){
          grid[x+i][y+j].selectable=1;
        }
      }
    }
  }
}

function moveTankToNewPosition(x,y){
  if(grid[x][y].selectable==1){
    tanks[whosTurn].pos.set(x,y);
    choosingDirection=false;
    howManyMovesLeft--;
    deselectEntireGrid();
    decision = 0;
  }
}

function showShootingOptions(){
  for(var i = 0; i < robots.length; i++){
    grid[robots[i].pos.x][robots[i].pos.y].selectable=1;
  }
}

function fireOnRobot(x,y){
  //write a for loop here to find robot that has same x,y coordinate
  for(var i = 0; i < robots.length; i++){
    if(floor(mouseX/resolution)==robots[i].pos.x && floor(mouseY/resolution)==robots[i].pos.y){
      robots[i].health-=5;
      choosingDirection=false;
      howManyMovesLeft--;
      deselectEntireGrid();
      decision = 0;
      selectedTool=0;
      bloodParticlesSetup(robots[i].pos.x, robots[i].pos.y);
      song.play();
      if(robots[i].health<=0){
        robots.splice(i,1);
      }
      tanks[whosTurn].ammo--;
    }
  }
}

function makeObstacle(x,y){
  if(grid[x][y].isObstacle==0){
    grid[x][y].isObstacle=1;
  } else {
    grid[x][y].isObstacle=0;
  }
}

function specialMove(x,y){
  //write a for loop here to find robot that has same x,y coordinate
  for(var i = 0; i < robots.length; i++){
    if(floor(mouseX/resolution)==robots[i].pos.x && floor(mouseY/resolution)==robots[i].pos.y){
      robots[i].health-=3;
      choosingDirection=false;
      howManyMovesLeft--;
      deselectEntireGrid();
      decision = 0;
      selectedTool=0;
      bloodParticlesSetup(robots[i].pos.x, robots[i].pos.y);
      moltovSound.play();
      if(robots[i].health<=0){
        robots.splice(i,1);
      }
      //tanks[whosTurn].ammo--;
    }
  }
}
