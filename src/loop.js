(function() {

  'use strict';

function gameLoop () {
    window.goomba.render();
    window.goomba.moveX();
    window.goomba.moveY();
    window.goomba.collisionDetection();
    window.requestAnimationFrame(gameLoop);
    
}

// window.goomba.addEventListener('load', gameLoop);
// for (let i = 0; i < 1000; i++ ) {
  window.requestAnimationFrame(gameLoop);
  // gameLoop();
// }

}());
