class Range{
  constructor(x1,y1,x2,y2){
    this.left = x1;
    this.top = y1;
    this.right = x2;
    this.bottom = y2;
  }
}

function countNeighbors(x,y, left, up, right, down){
  var sum = 0;
  for(var i = left; i < right+1; i++){
    for(var j = up; j < down+1; j++){
       sum+=grid[(worldSize.x/resolution+x+i)%(worldSize.x/resolution)][(worldSize.y/resolution+y+j)%(worldSize.y/resolution)].alive;
      }
    }
  sum-=grid[x][y].alive;
  return sum;
}

function make2DGrid(columns, rows){
  var anArray = [];
  for(var i = 0; i < columns; i++){
    anArray[i]=[];
    for(var j = 0; j < rows; j++){
      anArray[i].push(new Cell(0, i*resolution, j*resolution));
    }
  }
  return anArray;
}














function commandDraw(){

  for(var i = 0; i < grid.length; i++){
    for(var j = 0; j < grid[i].length; j++){
      var sum = 0;
      sum = countNeighbors(i, j, neighborhood.left, neighborhood.top, neighborhood.right, neighborhood.bottom);
      applyRules(sum, i, j);

    }
  }
}

function drawTheGrid(columns, rows){
  for(var i=0; i < columns; i++){
    for(var j = 0; j < rows; j++){
      if(grid[i][j]==1){
        fill("purple");
        rect(i*resolution, j*resolution, resolution-1, resolution-1);
      }
    }
  }
}

function applyRules(sum, i, j){
  applyGameOfLifeRules(sum, i, j);
  if(inColor){
    colorRules(i,j);
  }
}

function applyGameOfLifeRules(sum, i, j){
  if(grid[i][j].alive==1 && sum >= 2 && sum <= 3){
    next[i][j].alive=1;
  } else {
    next[i][j].alive=0;
  }

  if(grid[i][j].alive==0 && sum == 3){
    next[i][j].alive=1;
  }
}

function colorRules(x, y){
  if(next[x][y].alive){
    var finalColor = createVector(0,0,0);
    var sum = 0;
    for(var i = -1; i < 2; i++){
      for(var j = -1; j < 2; j++){
        var brackets1 = (worldSize.x/resolution+x+i)%(worldSize.x/resolution);
        var brackets2 = (worldSize.y/resolution+y+j)%(worldSize.y/resolution);
        if(grid[brackets1][brackets2].alive){
          finalColor.add(grid[brackets1][brackets2].color);
          sum++;
        }
      }
    }
    console.log(sum);
    console.log(finalColor);
    finalColor.div(sum);
    var randomColor = createVector(floor(random(-20,20)),floor(random(-20,20)),floor(random(-20,20)));
    finalColor.add(randomColor);
    if(finalColor.x < 40){
      finalColor.x = 40;
    }
    if(finalColor.y < 40){
      finalColor.y = 40;
    }
    if(finalColor.z < 40){
      finalColor.z = 40;
    }
    next[x][y].color.set(floor(finalColor.x),floor(finalColor.y),floor(finalColor.z))
  }
}
