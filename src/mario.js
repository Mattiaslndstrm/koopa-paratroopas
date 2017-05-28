/**
 * src/mario.js
 *
 * Creates the Mario object
 *
*/

/**
 * notes:
 * In order to make Mario an instance of Sprite(),
 * you need to run `var mario = new Sprite()`,
 * and then add function properties to it (methods).
 * e.g. `mario.jump = function () {// Jump!}`
 *
 * in other words, you do *not* make a new object that
 * inherits from Sprite(), and *then* instantiate that new object.
*/

//The frames in the sprite sheet is 16x16px
//mario_wjlfy5.png
        // context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
        // img Source image object     
        // sx  Source x    
        // sy  Source y   
        // sw  Source width    
        // sh  Source height   
        // dx  Destination x   
        // dy  Destination y   
        // dw  Destination width   
        // dh  Destination height  

// window.onload = function() {
(function() {

'use strict';
var canvas = window.sprite_canvas,
    ctx    = window.sprite_canvas.ctx,
    keys   = window.keys;

var marioImage = new Image();
marioImage.src = 'assets/mario_wjlfy5.png';

function sprite (options) {
    //Regarding that (jshint linter speaking): If a strict mode function is 
    //executed using function invocation, its 'this' value will be undefined.
    var that = {}, 
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

    that.moving = 0;
    that.context = ctx;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.x = options.x;
    that.y = options.y;
    that.velocityX = options.velocityX;
    that.velocityY = options.velocityY;
    that.gravity = options.gravity;
    that.collisionX = false;
    that.onground = true;
    // that.left = options.left;
    // that.right = options.right;
    that.topIndex = options.topIndex;
    that.jumpHeight = options.jumpHeight;

    that.render = function () {
        // Clear the canvas
        // that.context.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the animation
        that.context.drawImage (
            that.image,
            frameIndex * that.width / numberOfFrames,
            that.topIndex,
            that.width / numberOfFrames,
            that.height,
            that.x,
            that.y,
            that.width / numberOfFrames,
            that.height);
    };

    that.loop = options.loop;

    that.update = function() {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (frameIndex < numberOfFrames -1) {
                frameIndex += 1;
            }
            else if (that.loop) {
                frameIndex = 1;
            }
            else {
                frameIndex = 1;
            }
        }
    };

    that.run = function(keys) {
      if (keys.right) {
        that.topIndex = 0;
        that.update();
      } else if (keys.left) {
        that.topIndex = 16;
        that.update();
      } else {
        frameIndex = 0;
      }
    };

    that.stop = function() {
      that.frameIndex = 0;
    };


    that.runRight = function() {
        tickCount += 1;
        that.topIndex = 0;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (frameIndex < numberOfFrames -1) {
                frameIndex += 1;
            }
            else if (that.loop) {
                frameIndex = 1;
            }
            else {
                frameIndex = 1;
            }
        }
    
    };

    that.runLeft = function() {
        tickCount += 1;
        that.topIndex = 16;

        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (frameIndex < numberOfFrames -1) {
                frameIndex += 1;
            }
            else if (that.loop) {
                frameIndex = 1;
            }
            else {
                frameIndex = 1;
            }
        }
    
    };

    that.jump = function() {
        if (that.onground) {
                that.velocityY = + that.jumpHeight;
                that.onground = false;
            }
        
    };

    // This works while Mario is only running on one vertical plane.
    // My spontaneous suggestion is that we set a variable that updates when
    // colliosion happens, and update that with the x-coordinates of the 
    // object. No idea if it will work, but let's try it!
    that.collisionDetection = function() {
        if (that.y >= (canvas.height - 16) -2*16) {
            that.onground = true;
            that.y = (canvas.height - 16) -2*16;
        }
    };

    that.moveY = function() {
        
        that.velocityY += that.gravity;
        that.y += that.velocityY;

        if (keys.up) {
            that.jump();
        }
        // Jumping position
        // There is a bug here that makes Mario jump in standing position if 
        // you press the up button for an extremely short duration. We can call 
        // it a hidden feature!
        if (keys.up || !that.onground){
            frameIndex = 5;
        }
        // if (that.onground) {
        //     that.velocityY = 0;
        // }

        
    };

    that.moveX = function() {
        if (keys.right && that.x < canvas.width - that.width / numberOfFrames) {
            that.x += that.velocityX;
            that.runRight();
            // that.right = 1;
            // that.left = 0;
        }
        else if (keys.left && that.x > 0) {
            that.x -= that.velocityX;
            that.runLeft();
            // that.right = 0;
            // that.left = 1;
        }

        else  {
            frameIndex = 0;
        }
    };

    return that;
}


var mario = sprite({
    // context: window.sprite_canvas.getContext('2d'),
    width: 64,
    height: 16,
    topIndex: 0,
    image: marioImage,
    numberOfFrames: 4,
    ticksPerFrame: 8,
    x: 20,
    y: (canvas.height - 16) -2*16,
    velocityX: 1.5,
    velocityY: 0,
    gravity: 0.3,
    onground: true,
    jumpHeight: -8,
    // right: true,
    // left: false,
});

mario.moveHero = function(keys) {
  // console.log("frameIndex: " + this.frameIndex);
  // Originally, moveX and moveY were called every frame
  // now, they're not, so Mario just stops when you release a key
  // Somehow, each render needs to check where Mario is, to
  // decide whether to continue the action.
  //    Define run(), which just loops frames
  if ( keys.right ) {
    // this.topIndex = 0;
    // this.run();
    this.moveX();
  } else if ( keys.left ) {
    // this.topIndex = 1;
    // this.run();
    this.moveX();
  } else if ( keys.up ) {
    this.moveY();
  } else {
    this.frameIndex = 0;
  }
}

mario.render = function (keys) {
    console.log(JSON.stringify(keys));
    // Clear the canvas
    // that.context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the animation
    this.run(keys);
    this.context.drawImage (
        this.image,
        this.frameIndex * this.width / this.numberOfFrames,
        this.topIndex,
        this.width / numberOfFrames,
        this.height,
        this.x,
        this.y,
        this.width / numberOfFrames,
        this.height);
};
window.mario = mario;

}());
