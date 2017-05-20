/**
 * sprite.js
 *
 * Object constructor for all sprites
*/

var Monster = function(options) {
    //Regarding that (jshint linter speaking): If a strict mode function is 
    //executed using function invocation, its 'this' value will be undefined.
    var that = {}, 
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;
        motion_direction = 'R';

    that.context    = options.context;
    that.width      = options.width; // width of sprite
    that.height     = options.height; // height of sprite
    that.image      = options.image; // spritesheet file
    that.x          = options.x; // window.canvas x position
    that.y          = options.y; // window.canvas y position
    that.velocityX  = options.velocityX;
    that.velocityY  = options.velocityY;
    that.gravity    = options.gravity;
    that.collisionX = false;
    that.onground   = true;
    that.leftIndex  = options.leftIndex;
    that.rightIndex = options.rightIndex;
    that.topIndex   = options.leftIndex*16; // row to render
    that.jumpHeight = options.jumpHeight;

    that.render = function () {
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

    that.move = function() {
        if ( motion_direction === 'R' ) {
          that.runRight();
          // check collision, if true, change directions
        }
        else if ( motion_direction === 'L' ) {
          that.runLeft();
          // check collision, if true, change directions
        }
        that.moveX();
        that.moveY();
    }

    that.runRight = function() {
        tickCount += 1;
        // that.topIndex = 0;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (frameIndex < numberOfFrames -1) {
                frameIndex += 1;
            }
            else if (that.loop) {
                frameIndex = 0;
            }
            else {
                frameIndex = 0;
            }
        }
    
    };

    that.runLeft = function() {
        tickCount += 1;
        // that.topIndex = 16;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (frameIndex < numberOfFrames -1) {
                frameIndex += 1;
            }
            else if (that.loop) {
                frameIndex = 0;
            }
            else {
                frameIndex = 0;
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
    // collision happens, and update that with the x-coordinates of the 
    // object. No idea if it will work, but let's try it!
    that.collisionDetection = function() {
        if (that.y >= window.canvas.height - 148) {
            that.onground = true;
            that.y = window.canvas.height - 148;
        }
    };

    that.moveY = function() {
        that.velocityY += that.gravity;
        that.y += that.velocityY;
        if (that.onground) {
            that.velocityY = 0;
        }
    };

    that.moveX = function() {
        if (motion_direction === 'R' && that.x < window.canvas.width - that.width / numberOfFrames) {
            that.x += that.velocityX;
            that.runRight();
        }
        else if (motion_direction === 'L' && that.x > 0) {
            that.x -= that.velocityX;
            that.runLeft();
        }
        else  {
            frameIndex = 0;
        }

        if ( that.x >= window.canvas.width - that.width / numberOfFrames ) {
          motion_direction = 'L';
          that.topIndex = that.leftIndex*16;
        }
        else if ( that.x <= 0 ) {
          motion_direction = 'R';
          that.topIndex = that.rightIndex*16;
        }
    };

    return that;
}
