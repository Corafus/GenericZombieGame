var ammo = [];

class Ammo{
  constructor(x,y){
    this.pos = createVector(x,y);
  }

  display(){
    image(img5, this.pos.x * resolution + resolution/2, this.pos.y*resolution + resolution/2, 10, 10);
  }
}
