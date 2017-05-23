window.onload = (function() {

  'use strict';

var canvas = window.sprite_canvas;

function gameLoop () {
    
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.goomba.render();
    window.goomba.moveX();
    window.goomba.moveY();
    window.goomba.collisionDetection();
    window.mario.render();
    window.mario.moveX();
    window.mario.moveY();
    window.mario.collisionDetection();
    window.requestAnimationFrame(gameLoop);
}

  // if mario.x <= canvas.width/2 then move mario
  // else move screen.x
  // -> need to externalize the horizontal keyhandler
  window.level_1.render();
  gameLoop();

}());
