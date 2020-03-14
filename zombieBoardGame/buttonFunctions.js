function buttonSetup(){

  buttons.push(new Button("play", 650, 50, 0));
  buttons.push(new Button("flipState", 25, 450, 1)); //name, position, toolNumber
  buttons.push(new Button("glider", 100, 450, 2)); //name, position, toolNumber
  buttons.push(new Button("lightWeightShip", 175, 450, 3)); //name, position, toolNumber
  buttons.push(new Button("middleWeightShip", 250, 450, 4)); //name, position, toolNumber
  buttons.push(new Button("heavyWeightShip", 325, 450, 5)); //name, position, toolNumber
  buttons.push(new Button("eraser", 25, 500, 6)); //name, position, toolNumber
  buttons.push(new Button("clear", 650, 100, 7)); //name, position, toolNumber
  buttons.push(new Button("_", 100, 420, 8)); //name, position, toolNumber
  buttons[8].size.x = 20;
  buttons[8].size.y = 20;
  buttons.push(new Button("_", 145, 420, 9));
  buttons.push(new Button("makeObstalce", 145, 420, 10)); //name, position, toolNumber
  buttons.push(new Button("fireOnRobot", 145, 420, 11)); //name, position, toolNumber
  buttons.push(new Button("specialMove", 145, 420, 11)); //name, position, toolNumber
  buttons[9].size.x = 20;
  buttons[9].size.y = 20;

  for(i = 0; i < buttons.length; i++){
    buttons[i].position.x = worldSize.x +20;
    buttons[i].position.y = i*25 + worldSize.y+20;
  }
}

function mousePressed(){
  var location = createVector();
  if(mouseX < worldSize.x && mouseY < worldSize.y && paused==true){
    location.x = floor(mouseX/resolution);
    location.y = floor(mouseY/resolution);
    useSelectedTool(selectedTool, location.x, location.y);
  }

  for(var i = 0; i < buttons.length; i++){
    if(mouseX > buttons[i].position.x &&
      mouseX < buttons[i].position.x + buttons[i].size.x &&
      mouseY > buttons[i].position.y &&
      mouseY < buttons[i].position.y + buttons[i].size.y){
        performOperation(i);
      }
  }
}

function useSelectedTool(tool, x, y){
  if(tool==1){
    flipState(x,y);
  }
  if(tool==2){
    placeGlider(x, y);
  }
  if(tool==3){
    placeLightWeightShip(x, y);
  }
  if(tool==4){
    placeMiddleWeightShip(x, y);
  }
  if(tool==5){
    placeHeavyWeightShip(x, y);
  }
  if(tool==6){
    eraser(x, y);
  }
  if(tool==9){
    moveTankToNewPosition(x, y);
  }

  if(tool==10){
    makeObstacle(x, y);
  }

  if(tool==11){
    fireOnRobot(x,y);
  }

  if(tool==12){
    specialMove(x,y);
  }
}

function performOperation(i){
  if(i==0){
    playPause();
  } else if(i==7){
    clearGrid();
  } else if(i==8){
    gliderDirection=(4+gliderDirection-1)%2;
  }else if(i==9){
    gliderDirection=(gliderDirection+1)%2;
  }else {
    selectedTool = i;
  }

}
