/**
 * src/monster.js
 *
 * Creates some monster
 * for testing purposes
 *
*/

(function() {

var canvas = document.getElementById('game');
canvas.width = 640;
canvas.height = 480;

  // event listener?  no, not player controllable
  // runRight
  // runLeft
  // jump
  // detect collision
  // react to collision

  // var Monster = function(size, x, y) {
  //   this.size = size;
  //   this.x    = x;
  //   this.y    = y;
  // };

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
  var goomba = Monster({
    context: canvas.getContext('2d'),
    width: 32,
    height: 16,
    leftIndex: 1,
    rightIndex: 1,
    // topIndex: 1,
    image: goomba_tilemap,
    numberOfFrames: 2,
    ticksPerFrame: 16,
    x: 20,
    y: canvas.height - 148,
    velocityX: 0.75,
    velocityY: 0,
    gravity: 0.3,
    onground: true,
    jumpHeight: -8
  });

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
// function Monster (options) {
//     //Regarding that (jshint linter speaking): If a strict mode function is 
//     //executed using function invocation, its 'this' value will be undefined.
//     var that = {}, 
//         frameIndex = 0,
//         tickCount = 0,
//         ticksPerFrame = options.ticksPerFrame || 0,
//         numberOfFrames = options.numberOfFrames || 1;
//         motion_direction = 'R';

//     that.context    = options.context;
//     that.width      = options.width; // width of sprite
//     that.height     = options.height; // height of sprite
//     that.image      = options.image; // spritesheet file
//     that.x          = options.x; // canvas x position
//     that.y          = options.y; // canvas y position
//     that.velocityX  = options.velocityX;
//     that.velocityY  = options.velocityY;
//     that.gravity    = options.gravity;
//     that.collisionX = false;
//     that.onground   = true;
//     that.leftIndex  = options.leftIndex;
//     that.rightIndex = options.rightIndex;
//     that.topIndex   = options.leftIndex*16; // row to render
//     that.jumpHeight = options.jumpHeight;

//     that.render = function () {
//         // Clear the canvas
//         that.context.clearRect(0, 0, canvas.width, canvas.height);
//         // Draw the animation
//         that.context.drawImage (
//             that.image,
//             frameIndex * that.width / numberOfFrames,
//             that.topIndex,
//             that.width / numberOfFrames,
//             that.height,
//             that.x,
//             that.y,
//             that.width / numberOfFrames,
//             that.height);
//     };

//     that.loop = options.loop;

//     that.move = function() {
//         if ( motion_direction === 'R' ) {
//           that.runRight();
//           // check collision, if true, change directions
//         }
//         else if ( motion_direction === 'L' ) {
//           that.runLeft();
//           // check collision, if true, change directions
//         }
//         that.moveX();
//         that.moveY();
//     }

//     that.runRight = function() {
//         tickCount += 1;
//         // that.topIndex = 0;
//         if (tickCount > ticksPerFrame) {
//             tickCount = 0;
//             if (frameIndex < numberOfFrames -1) {
//                 frameIndex += 1;
//             }
//             else if (that.loop) {
//                 frameIndex = 0;
//             }
//             else {
//                 frameIndex = 0;
//             }
//         }
    
//     };

//     that.runLeft = function() {
//         tickCount += 1;
//         // that.topIndex = 16;
//         if (tickCount > ticksPerFrame) {
//             tickCount = 0;
//             if (frameIndex < numberOfFrames -1) {
//                 frameIndex += 1;
//             }
//             else if (that.loop) {
//                 frameIndex = 0;
//             }
//             else {
//                 frameIndex = 0;
//             }
//         }
    
//     };

//     that.jump = function() {
//         if (that.onground) {
//                 that.velocityY = + that.jumpHeight;
//                 that.onground = false;
//             }
        
//     };

//     // This works while Mario is only running on one vertical plane.
//     // My spontaneous suggestion is that we set a variable that updates when
//     // collision happens, and update that with the x-coordinates of the 
//     // object. No idea if it will work, but let's try it!
//     that.collisionDetection = function() {
//         if (that.y >= canvas.height - 148) {
//             that.onground = true;
//             that.y = canvas.height - 148;
//         }
//     };

//     that.moveY = function() {
//         that.velocityY += that.gravity;
//         that.y += that.velocityY;
//         // if (upPressed) {
//         //     that.jump();
//         // }
//         // Jumping position
//         // There is a bug here that makes Mario jump in standing position if 
//         // you press the up button for an extremely short duration. We can call 
//         // it a hidden feature!
//         // if (upPressed || !that.onground){
//         //     frameIndex = 5;
//         // }
//         if (that.onground) {
//             that.velocityY = 0;
//         }
//     };

//     that.moveX = function() {
//         if (motion_direction === 'R' && that.x < canvas.width - that.width / numberOfFrames) {
//             that.x += that.velocityX;
//             that.runRight();
//             // that.right = true;
//             // that.left = false;
//         }
//         else if (motion_direction === 'L' && that.x > 0) {
//             that.x -= that.velocityX;
//             that.runLeft();
//             // that.right = false;
//             // that.left = true;
//         }
//         else  {
//             frameIndex = 0;
//         }

//         if ( that.x >= canvas.width - that.width / numberOfFrames ) {
//           motion_direction = 'L';
//           that.topIndex = that.leftIndex*16;
//         }
//         else if ( that.x <= 0 ) {
//           motion_direction = 'R';
//           that.topIndex = that.rightIndex*16;
//         }
//     };

//     return that;
// }

// function gameLoop () {
//     window.requestAnimationFrame(gameLoop);
//     goomba.render();
//     goomba.moveX();
//     goomba.moveY();
//     goomba.collisionDetection();
// }

// marioImage.addEventListener('load', gameLoop());
// goomba_tilemap.addEventListener('load', gameLoop);

window.goomba = goomba;

}());
