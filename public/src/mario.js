'use strict';
/**
 * src/mario.js
 *
 * Creates the Mario object
 *
*/
//The frames in the sprite sheet is 16x16px
//mario_wjlfy5.png

window.onload = function() {

var canvas = document.getElementById('game');
canvas.width = 640;
canvas.height = 480;
var marioImage = new Image();
marioImage.src = 'assets/mario_wjlfy5_large.png';
var rightPressed = false;
var leftPressed = false;
var upPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }

    else if (e.keyCode == 38) {
        upPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 38) {
        upPressed = false;
    }
}


function sprite (options) {
    var that = {}, 
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.x = options.x;
    that.y = options.y;
    that.xVelocity = options.xVelocity;
    that.yVelocity = options.yVelocity;
    // that.left = options.left;
    // that.right = options.right;
    that.topIndex = options.topIndex;

    that.render = function () {
        // Clear the canvas
        that.context.clearRect(0, 0, canvas.width, canvas.height);
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

//     that.update = function() {
//         tickCount += 1;

//         if (tickCount > ticksPerFrame) {
//             tickCount = 0;
//             if (frameIndex < numberOfFrames -1) {
//                 frameIndex += 1;
//             }
//             else if (that.loop) {
//                 frameIndex = 1;
//             }
//             else {
//                 frameIndex = 1;
//             }
//         }
// };
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
        that.topIndex = 128;

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
        frameIndex = 5;
    };
    that.move = function() {
        if (rightPressed === true && that.x < canvas.width - that.width / numberOfFrames) {
            that.x += xVelocity;
            that.runRight();
            // that.right = true;
            // that.left = false;
        }
        else if (leftPressed === true && that.x > 0) {
            that.x -= xVelocity;
            that.runLeft();
            // that.right = false;
            // that.left = true;
        }

        else if (upPressed === true) {
            that.jump();
        }
        else  {
            frameIndex = 0;
        }
    };

    return that;
}


var mario = sprite({
    context: canvas.getContext('2d'),
    width: 512,
    height: 128,
    topIndex: 0,
    image: marioImage,
    numberOfFrames: 4,
    ticksPerFrame: 8,
    x: 20,
    y: canvas.height - 148,
    xVelocity: 3,
    yVelocity: 0,
    // right: true,
    // left: false,
});

function gameLoop () {
    window.requestAnimationFrame(gameLoop);

    
    mario.render();
    mario.move();
}

// marioImage.addEventListener('load', gameLoop());
marioImage.addEventListener('load', gameLoop);


};
