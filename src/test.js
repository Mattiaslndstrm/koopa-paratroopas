'use strict'

var canvas = document.getElementById("game-canvas"),
    ctx    = canvas.getContext("2d"),

    box_side = 10,
    box_x = canvas.width/2,
    box_y = canvas.height/2,
    box_color = "#000000",
    background_color = "#0000ff",

    rightPressed = false,
    leftPressed = false;

// ============= Adding Character Objects!!!

var Character = function(x, y, h, w, c) {
  this.x = x;
  this.y = y;
  this.height = h;
  this.width = w;
  this.color = c;
  console.log("new Character!!");
};

Character.prototype.draw = function() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.height, this.width);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
};

var Peter = new Character(canvas.width/2, canvas.height/2, 20, 10, '#000000');








function drawBackground() {
  ctx.beginPath();
  ctx.rect(10, 10, canvas.width, canvas.height);
  ctx.fillStyle = background_color;
  ctx.fill();
  ctx.closePath();
}

function drawGround() {
  
}

function drawBox() {
  ctx.beginPath();
  ctx.rect(box_x, box_y, box_side, box_side);
  ctx.fillStyle = box_color;
  ctx.fill();
  ctx.closePath();
}




function draw() {
  drawBackground();
  // drawBox();
  Peter.draw();

  // move the box
  if ( rightPressed && box_x < canvas.width ) {
    Peter.x += 4;
  }
  else if ( leftPressed && box_x > 0 ) {
    Peter.x -= 4;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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


setInterval(draw, 10);

