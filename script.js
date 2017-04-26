//The frames in the sprite sheet is 16x16px
//mario_wjlfy5.png

window.onload = function() {

var canvas = document.getElementById('game');
canvas.width = 640;
canvas.height = 480;
var marioImage = new Image();
marioImage.src = 'images/mario_wjlfy5_large.png';
var rightPressed = false;
var leftPressed = false;
var marioLeft = false;
var marioRight = true;


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
// ctx.beginPath();
// ctx.rect(0,0, 10,10);
// ctx.fillStyle = '#FF0000';
// ctx.fill();
// ctx.closePath();

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}


function sprite (options) {
    var that = {}, frameIndex = 1,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.x = options.x;
    that.y = options.y;

    that.render = function () {
        // Clear the canvas
        that.context.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the animation
        that.context.drawImage (
            that.image,
            frameIndex * that.width / numberOfFrames,
            0,
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

    that.move = function() {
        if (rightPressed === true && that.x < canvas.width - that.width / numberOfFrames) {
            mario.x += 5;
        }
        else if (leftPressed === true && that.x > 0) {
            mario.x -= 5;
        }
    };

    return that;
}


var mario = sprite({
    context: canvas.getContext('2d'),
    width: 512,
    height: 128,
    image: marioImage,
    numberOfFrames: 4,
    ticksPerFrame: 8,
    x: 20,
    y: canvas.height - 148, 
});

function gameLoop () {
    window.requestAnimationFrame(gameLoop);

    mario.update();
    mario.render();
    mario.move()
}
marioImage.addEventListener('load', gameLoop);

};