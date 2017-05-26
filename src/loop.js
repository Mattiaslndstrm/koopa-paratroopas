window.onload = (function() {

  'use strict';
  /*jshint esnext: true*/

var canvas = window.sprite_canvas;

function gameLoop () {
    
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.goombaArray.forEach(function(goomba) {
      goomba.render();
      goomba.moveX();
      goomba.moveY();
      goomba.collisionDetection();
    });
    window.mario.render();
    window.mario.moveX();
    window.mario.moveY();
    window.mario.collisionDetection();
    window.requestAnimationFrame(gameLoop);
}

  window.level_1.render();
  gameLoop();

}());
