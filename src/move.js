
var rightPressed = 0;
var leftPressed = 0;

document.addEventListener('keydown', keyDownHandler, 0);
document.addEventListener('keyup', keyUpHandler, 0);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = 1;
    }
    else if (e.keyCode == 37) {
        leftPressed = 1;
    }

    else if (e.keyCode == 38) {
        upPressed = 1;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = 0;
    }
    else if (e.keyCode == 37) {
        leftPressed = 0;
    }
    else if (e.keyCode == 38) {
        upPressed = 0;
    }
}

var keys = {0, 0, 0, 0}; // {left, right, up, down}
keys = {left_pressed, right_pressed, up_pressed, down_pressed};

if (window.mario.x <= window.sprite_canvas.width/2) {
  
