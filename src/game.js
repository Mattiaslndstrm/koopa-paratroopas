/**
 * src/game.js
 *
 * Draws the game board, each time tick
 *
*/

(function() {
  'use strict';

  window.onload = function() {

    var canvas = document.getElementById('game');
    canvas.width = 640;
    canvas.height = 480;

    function gameLoop () {
        window.requestAnimationFrame(gameLoop);
        mario.render();
        mario.moveX();
        mario.moveY();
        mario.collisionDetection();
    }
    marioImage.addEventListener('load', gameLoop);


  };

}());
