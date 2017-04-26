//The frames in the sprite sheet is 16x16px
//mario_wjlfy5.png

window.onload = function() {

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 300;
var marioImage = new Image();
marioImage.src = 'images/mario_wjlfy5_large.png';
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
// ctx.beginPath();
// ctx.rect(0,0, 10,10);
// ctx.fillStyle = '#FF0000';
// ctx.fill();
// ctx.closePath();



function sprite (options) {
    var that = {}, frameIndex = 1,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.render = function () {
        // Clear the canvas
        that.context.clearRect(0,0, that.width, that.height);
        // Draw the animation
        that.context.drawImage (
            that.image,
            frameIndex * that.width / numberOfFrames,
            0,
            that.width / numberOfFrames,
            that.height,
            0,
            0,
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

    return that;
}


var mario = sprite({
    context: canvas.getContext('2d'),
    width: 512,
    height: 128,
    image: marioImage,
    numberOfFrames: 4,
    ticksPerFrame: 8, 
});

function gameLoop () {
    window.requestAnimationFrame(gameLoop);

    mario.update();
    mario.render();
}
marioImage.addEventListener('load', gameLoop);

};