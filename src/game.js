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
    canvas.width = 1280;
    canvas.height = 480;

    var landscape = new Image();
    landscape.src = "assets/landscape_tileset.png";
    landscape.addEventListener('load', console.log("landscape just loaded"));

    function gameLoop () {
        console.log("inside game loop");
        level_1.render();
    //     window.requestAnimationFrame(gameLoop);
        // mario.render();
        // mario.moveX();
        // mario.moveY();
        // mario.collisionDetection();
    }
    // marioImage.addEventListener('load', gameLoop);
    landscape.addEventListener('load', gameLoop);


  };

}());
