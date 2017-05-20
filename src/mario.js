/**
 * src/mario.js
 *
 * Creates the Mario object
 *
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
// var canvas = document.getElementById('game');
// canvas.width = 640;
// canvas.height = 480;
var marioImage = new Image();
marioImage.src = 'assets/mario_wjlfy5.png';
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
    //Regarding that (jshint linter speaking): If a strict mode function is 
    //executed using function invocation, its 'this' value will be undefined.
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
        if (that.y >= canvas.height - 148) {
            that.onground = true;
            that.y = canvas.height - 148;
        }
    };

    that.moveY = function() {
        
        that.velocityY += that.gravity;
        that.y += that.velocityY;

        if (upPressed) {
            that.jump();
        }
        // Jumping position
        // There is a bug here that makes Mario jump in standing position if 
        // you press the up button for an extremely short duration. We can call 
        // it a hidden feature!
        if (upPressed || !that.onground){
            frameIndex = 5;
        }
        // if (that.onground) {
        //     that.velocityY = 0;
        // }

        
    };

    that.moveX = function() {
        if (rightPressed && that.x < canvas.width - that.width / numberOfFrames) {
            that.x += that.velocityX;
            that.runRight();
            // that.right = true;
            // that.left = false;
        }
        else if (leftPressed && that.x > 0) {
            that.x -= that.velocityX;
            that.runLeft();
            // that.right = false;
            // that.left = true;
        }

        else  {
            frameIndex = 0;
        }
    };

    return that;
}


var mario = sprite({
    context: canvas.getContext('2d'),
    width: 64,
    height: 16,
    topIndex: 0,
    image: marioImage,
    numberOfFrames: 4,
    ticksPerFrame: 8,
    x: 20,
    y: canvas.height - 148,
    velocityX: 1.5,
    velocityY: 0,
    gravity: 0.3,
    onground: true,
    jumpHeight: -8,
    // right: true,
    // left: false,
});

// function gameLoop () {
//     window.requestAnimationFrame(gameLoop);

    
//     mario.render();
//     mario.moveX();
//     mario.moveY();
//     mario.collisionDetection();
// }

// marioImage.addEventListener('load', gameLoop());
// marioImage.addEventListener('load', gameLoop);

window.mario = mario;

}());
