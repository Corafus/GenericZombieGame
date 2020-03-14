class Cell{
  constructor(alive, x,y){
    this.position = createVector(x,y);
    this.alive = alive;
    this.color = createVector(floor(random(255)), floor(random(255)), floor(random(255)));
    this.selectable = 0;
    this.isObstacle = 0;


  }

  display(whatRow){
    if(whatRow==null){
      whatRow=1;
    }
    push();
    //OVERRIDE RANDOM COLOR

    if(this.selectable){
      strokeWeight(3);
      stroke("yellow");
    }

    if(this.alive){
      fill(180);

      rect(this.position.x, this.position.y, resolution, resolution*whatRow);
    } else {
      fill(50);
      if(this.isObstacle==1){
        fill("blue");
      }
      rect(this.position.x, this.position.y, resolution, resolution*whatRow);
    }
    pop();
  }
}
