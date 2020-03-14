function bloodParticlesSetup(x,y){
  for(var i = 0; i < 20; i++){
    bloodParticles.push(new BloodParticle(x,y));
  }
}

function bloodParticlesUpdate(){
  for(var i = bloodParticles.length -1; i >=0; i--){
    if(bloodParticles[i].lifeSpan<=0){
      bloodParticles.splice(i,1);
    }
  }

  for(var i = 0; i < bloodParticles.length; i++){
    bloodParticles[i].update();
  }
}
