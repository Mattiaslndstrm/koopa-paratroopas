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

  window.level_1.render();
  gameLoop();

}());
