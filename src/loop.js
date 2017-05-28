window.onload = (function() {

  'use strict';

var canvas = window.sprite_canvas;
var keys = window.keys;
var moving = keys.right + keys.left + keys.up + keys.down;

function gameLoop () {
    
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.goomba.render();
    window.goomba.moveX();
    window.goomba.moveY();
    window.goomba.collisionDetection();
    if (moving) {
      window.mario.render(window.keys);
    } else {
      window.mario.render(0);
    }
    // doesn't work!!
    // the problem:  frameIndex = 0 is used by runRight, but set in moveX.
    // if ( window.keys.right ) {
    //   if ( window.mario.x < canvas.width/2 ) {
        // window.mario.moveX();
      // window.mario.moveHero(window.keys);
      // } else if ( window.mario.x >= canvas.width/2 ) {
      //   window.mario.runRight();
      // } else {
      //   window.mario.frameIndex = 0;
      // }
    // }
    // window.mario.moveY();
    window.mario.collisionDetection();
    window.requestAnimationFrame(gameLoop);
}

  // if mario.x <= canvas.width/2 then move mario
  // else move screen.x
  // -> need to externalize the horizontal keyhandler
  window.level_1.render();
  gameLoop();

}());
