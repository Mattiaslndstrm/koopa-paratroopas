/**
 * src/monster.js
 *
 * Creates some monster
 * for testing purposes
 *
*/

/*jshint esnext: true*/
/*jshint browser: true*/

(function() {

  'use strict';

  var canvas = window.sprite_canvas;
  var goomba_tilemap = new Image();
  goomba_tilemap.src = 'assets/monsters_tileset.png';

  /**
   * Things that can be made automatic:
   * 1. numberOfFrames (width of image/16px)
   * 2. gravity should be property of World
   * 3. velocityX/Y - replace with `speed`
   *    The velocity should be determined by context
   * 4. width, height, context, topIndex
  */

  function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function monsterObject()  {

    return {
        // context: window.sprite_canvas.getContext('2d'),
        width: 32,
        height: 16,
        leftIndex: 1,
        rightIndex: 1,
        image: goomba_tilemap,
        numberOfFrames: 2,
        ticksPerFrame: 16,
        x: randBetween(20, canvas.width-20),
        y: (canvas.height - 16) - 2*16,
        velocityX: 0.75,
        velocityY: 0,
        gravity: 0.3,
        onground: true,
        jumpHeight: -8,
        motion_direction: randBetween(1, 2) == 1 ? 'L' : 'R'
      };

}


function createMonsters(num) {
    return [...Array(num)].map((a) => a = monsterObject());
}


  var goomba = Monster(monsterObject());

/**
 * OPTIONS:
    context
    width - width of spritesheet
    height - height of sprite on spritesheet
    topIndex - row of spritesheet, for left-right directions
    image - filename of spritesheet
    numberOfFrames - motion frames
    ticksPerFrame - time to spend on each frame
    x - x position on canvas
    y - y position on canvas
    velocityX - speed of horizontal motion
    velocityY - speed of vertical motion
    gravity - should not be in Sprite, but in World
    onground - boolean, maybe should be handled by collision?
    jumpHeight - max height the sprite can jump!
*/

window.goomba = goomba;

}());
