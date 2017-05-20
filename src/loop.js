window.onload = (function() {

  'use strict';

function gameLoop () {
    
    window.sprite_canvas.ctx.clearRect(0, 0, window.sprite_canvas.width, window.sprite_canvas.height);
    // window.level_0.render();
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

  gameLoop();

}());
