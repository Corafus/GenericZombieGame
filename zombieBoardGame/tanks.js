var tanks = [];

class Tank{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.health = 4;
    this.direction = 0;
    this.tankWidth = 20;
    this.tankLength = 30;
    this.howManyMovesLeft = 2;
    this.ammo = 2;
    this.alive = true;
  }

  display(){
    /*if(this.alive){
      image(img, this.pos.x * resolution, this.pos.y * resolution - resolution*1.5);
    }*/
  }
}

function aimTanks(){
  showShootingOptions();
  selectedTool = 11;
}

function aimSpecial(){
  showShootingOptions();
  selectedTool = 12;
}

function moveTanks(){
  showMovementOptions(tanks[whosTurn].pos.x, tanks[whosTurn].pos.y);
  selectedTool = 9;
}

function tanksPickup(){
  for(var i=0; i < ammo.length; i++){
    if(tanks[whosTurn].pos.x==ammo[i].pos.x && tanks[whosTurn].pos.y==ammo[i].pos.y){
      ammo.splice(i,1);
      tanks[whosTurn].ammo+=3;
    }
  }
}
