var bloodParticles = [];

class BloodParticle{
  constructor(x,y){
    this.pos = createVector(resolution* x + resolution/2, resolution* y - resolution/2);
    this.pos.x = this.pos.x + round(random(-3,3));
    this.pos.y = this.pos.y + round(random(-3,3));
    this.vel = createVector(0, 3);
    this.vel.x = this.vel.x +round(random(-3, 3));
    this.vel.y = this.vel.y + round(random(-3, 3));
    this.size = 4;
    this.lifeSpan = 60;

  }

  update(){
    this.lifeSpan--;
    this.pos.add(this.vel);
    push();
    fill('red');
    rect(this.pos.x, this.pos.y, this.size, this.size);
    pop();
  }
}
