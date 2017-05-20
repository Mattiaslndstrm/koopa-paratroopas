/**
 * src/game.js
 *
 * Contains all game logic (points, positions of characters, etc.)
 *
*/


(function() {
  
  'use strict';
  
  var width  = 640,
      height = 480;

  function initializeBackground () {
    var canvas = document.getElementById('game-background');
    canvas.width = width;
    canvas.height = height;
    canvas.ctx = canvas.getContext('2d');
    window.back_canvas = canvas;
  }


  function initializeSpriteCanvas () {
    var canvas = document.getElementById('game-sprites');
    canvas.width = width;
    canvas.height = height;
    canvas.ctx = canvas.getContext('2d');
    window.sprite_canvas = canvas;
  }


  function init() {
    initializeBackground();
    initializeSpriteCanvas();
  }

  init();

}());
