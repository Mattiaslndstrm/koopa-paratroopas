/*jshint esnext: true*/
/*jshint browser: true*/
'use strict'

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
        // image: goomba_tilemap,
        numberOfFrames: 2,
        ticksPerFrame: 16,
        x: randBetween(20, 500),
        // y: (window.sprite_canvas.height - 16) - 2*16,
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


// var monsterObject = {
//     // context: window.sprite_canvas.getContext('2d'),
//     width: 32,
//     height: 16,
//     leftIndex: 1,
//     rightIndex: 1,
//     image: goomba_tilemap,
//     numberOfFrames: 2,
//     ticksPerFrame: 16,
//     x: randBetween(20, window.sprite_canvas.width-20),
//     y: (window.sprite_canvas.height - 16) - 2*16,
//     velocityX: 0.75,
//     velocityY: 0,
//     gravity: 0.3,
//     onground: true,
//     jumpHeight: -8
//   };
