(function() {

  'use strict';

function gameLoop (timestamp) {
    // console.log(timestamp);
    window.goomba.render();
    window.goomba.moveX();
    window.goomba.moveY();
    window.goomba.collisionDetection();
    window.requestAnimationFrame(gameLoop);
    
}

  window.requestAnimationFrame(gameLoop);

}());
