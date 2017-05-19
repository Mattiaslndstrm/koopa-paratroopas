(function() {

  'use strict';

function gameLoop () {
    window.requestAnimationFrame(gameLoop);
    window.goomba.render();
    window.goomba.moveX();
    window.goomba.moveY();
    window.goomba.collisionDetection();
}

// goomba_tilemap.addEventListener('load', gameLoop);
for (let i = 0; i < 1000; i++ ) {
  gameLoop();
}

}());
