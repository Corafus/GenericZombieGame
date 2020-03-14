var robots = [];

class Robot{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.health = 15;
    this.direction = 0;
    this.listOfActions=["move", "move", "bite"];
    this.whichActionToPerform=-1;
    this.behavior=0;
    this.eyeLaserRange = worldSize.x/resolution - this.pos.x * resolution;

  }

  update(){
    this.behavior=this.listOfActions[this.whichActionToPerform];

    if(this.behavior=="move"){
      if(counter>0){
        counter--;
      }
      //Move, unless I'm about to leave the board
      if(counter===10){
        /*if(this.direction===0){
          if(this.pos.x<worldSize.x/resolution-1){
            this.pos.x++;
          }

          //If I bump into a tank, move back
          for(var i = 0; i < tanks.length; i++){
            if(this.pos.x == tanks[i].pos.x && this.pos.y == tanks[i].pos.y){
              this.pos.x--;
            }
          }
        }
        if(this.direction===1){
          if(this.pos.y<worldSize.y/resolution-1){
            this.pos.y++;
          }
          for(var i = 0; i < tanks.length; i++){
            if(this.pos.x == tanks[i].pos.x && this.pos.y == tanks[i].pos.y){
              this.pos.y--;
            }
          }
        }
        if(this.direction===2){
          if(this.pos.x>0){
            this.pos.x--;
          }
          for(var i = 0; i < tanks.length; i++){
            if(this.pos.x == tanks[i].pos.x && this.pos.y == tanks[i].pos.y){
              this.pos.x++;
            }
          }
        }
        if(this.direction===3){
          if(this.pos.y>0){
            this.pos.y--;
          }
          for(var i = 0; i < tanks.length; i++){
            if(this.pos.x == tanks[i].pos.x && this.pos.y == tanks[i].pos.y){
              this.pos.y++;
            }
          }
        }*/


        //just find the closet player character
        var shortestDistance = 1000;
        var currentDistance;
        var target = createVector();
        for(var i = 0; i < tanks.length; i++){
          if(tanks[i].alive){
            currentDistance = sqrt(sq(this.pos.x - tanks[i].pos.x) + sq(this.pos.y - tanks[i].pos.y));
            if(currentDistance < shortestDistance){
              shortestDistance = currentDistance;
              target.set(tanks[i].pos.x, tanks[i].pos.y);
            }
          }
        }
        var direction = target.sub(this.pos);

        direction.normalize();
        if(abs(direction.x) > abs(direction.y)){
          direction.y = 0;
        } else {
          direction.x = 0;
        }
        direction.x = round(direction.x);
        direction.y = round(direction.y);
        console.log(direction);
        this.pos.add(direction);

      }


      if(counter===0){
        this.whichActionToPerform++;
        counter=60;
      }

    }
    if(this.behavior=="turn"){
      if(counter>0){
        counter--;
      }
      if(counter===10){
        var direction = random([-1, 1]);
        this.direction+=direction;
        if(this.direction>3){
          this.direction=0;
        }
        if(this.direction<0){
          this.direction=3;
        }
      }
      if(counter===0){
        this.whichActionToPerform++;
        counter=60;
      }
      push();
      textSize(50);
      textAlign(CENTER);
      fill("red");
      text("ROBOT IS TURNING!", width/2, height/2);
      pop();
    }
    if(this.behavior=="shoot"){
      if(counter>0){
        counter--;
      }

      push();
      fill('red');
      if(this.direction==0){

        for(var i = 0; i < tanks.length; i++){
          if(tanks[i].pos.x > this.pos.x && tanks[i].pos.y== this.pos.y){
            this.eyeLaserRange = (tanks[i].pos.x - this.pos.x)*resolution;
          }
          rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution+ resolution/2 -5,
            this.eyeLaserRange, 10);
        }
      }
      if(this.direction==1){
        rect(this.pos.x*resolution + resolution/2-5, this.pos.y*resolution+ resolution/2, 10, 800);
      }
      if(this.direction==2){
        for(var i = 0; i < tanks.length; i++){
          if(tanks[i].pos.x < this.pos.x && tanks[i].pos.y== this.pos.y){
            this.eyeLaserRange = (tanks[i].pos.x - this.pos.x)*resolution;
          }
          rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution+ resolution/2 -5,
            this.eyeLaserRange, 10);
        }
      }
      if(this.direction==3){
        rect(this.pos.x*resolution + resolution/2-5, this.pos.y*resolution+ resolution/2, 10, -800);
      }
      pop();


      if(counter===10){
        for(var i = 0; i < tanks.length; i++){
          if(this.direction===0 && tanks[i].pos.x > this.pos.x && tanks[i].pos.y===this.pos.y){
            tanks[i].health--;
          }
          if(this.direction===1 && tanks[i].pos.y > this.pos.y && tanks[i].pos.x===this.pos.x){
            tanks[i].health--;
          }
          if(this.direction===2 && tanks[i].pos.x < this.pos.x && tanks[i].pos.y===this.pos.y){
            tanks[i].health--;
          }
          if(this.direction===3 && tanks[i].pos.y < this.pos.y && tanks[i].pos.x===this.pos.x){
            tanks[i].health--;
          }
        }
      }
      if(counter===0){
        this.whichActionToPerform++;
        counter=180;
      }
      push();
      textSize(50);
      textAlign(CENTER);
      fill("red");
      text("ROBOT PERFORMED EYE LASER!", width/2, height/2);
      pop();
    }
    if(this.behavior=="bite"){
      if(counter>0){
        counter--;
      }
      if(counter===10){
        for(var i = 0; i < tanks.length; i++){
          var xDistance = abs(this.pos.x - tanks[i].pos.x);
          var yDistance = abs(this.pos.y - tanks[i].pos.y);
          if(xDistance < 2 && yDistance < 2 && xDistance + yDistance < 2){

            if(i==0){
              ouch.play();
            }
            if(i==1){
              ladyOuch.play();
            }
            if(i==2){
              drunkGuyOuch.play();
            }

            bloodParticlesSetup(tanks[i].pos.x, tanks[i].pos.y);
            tanks[i].health--;
            break;
          }
        }
      }
      if(counter===0){
        this.whichActionToPerform++;
        counter=180;
      }
    }

    if(this.whichActionToPerform > this.listOfActions.length-1){
      howManyMovesLeft=0;
      this.whichActionToPerform=-1;
    }
  }

  display(){
    text(this.health, this.pos.x*resolution+resolution/2, this.pos.y*resolution+resolution - 10);
  }
}
