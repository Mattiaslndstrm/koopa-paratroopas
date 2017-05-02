/**
 * src/background.js
 *
 * draws the background AND the foreground (stuff characters can walk on)
 *
*/
'use strict'

// canvas
var DOM = {};

DOM.$canvas = document.getElementById("game");
var ctx     = DOM.$canvas.getContext("2d");

// new Image()
var landscape = new Image();
landscape.src = "assets/landscape_tileset.png";

var tile = function (context, column, row, image) {
  var that = {}; // why not just use `this`?
  that.context = context;
  that.width   = 16;
  that.height  = 16;
  that.column  = column;
  that.row     = row;
  that.image   = image;

  // context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) s=source, d=destination
  that.render = function (x, y) {
    that.image.addEventListener('load', function() {// "window.onload"
      that.context.drawImage(
        that.image,
        16 * that.column,
        16 * that.row,
        that.width,
        that.height,
        x,
        y,
        that.width,
        that.height);
    });
  };

  return that;
}

// var tiles = {
//   "floor" : tile( ctx, 0, 0, landscape),
//   "brick" : tile( ctx, 1, 0, landscape),
//   "question" : tile( ctx, 24, 0, landscape)
// }

var floor_tile = tile( ctx, 0, 0, landscape);
var brick_tile = tile( ctx, 1, 0, landscape);
var question_tile = tile( ctx, 24, 0, landscape);
// context.drawImage

// render -> drawImage

var background = [
'                ',
'                ',
'                ',
'                ',
'                ',
'                ',
'                ',
'                ',
'                ',
'     bb?b?bb    ',
'                ',
'                ',
'                ',
'                ',
'fffff   ffffffff',
'fffff   ffffffff'
];


for (var i = 0; i < 16; i++) {
  for (var j = 0; j < 16; j++) {
    switch (background[i].substring(j,j+1)) {
    case 'f':
      floor_tile.render(j*16, i*16);
      break;
    case 'b':
      brick_tile.render(j*16, i*16);
      break;
    case '?':
      question_tile.render(j*16, i*16);
      break;
    default:
      break;
    }
  }
}

