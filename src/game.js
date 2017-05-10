/**
 * src/game.js
 *
 * Contains all game logic (points, positions of characters, etc.)
 *
*/


var Game = (function() {
  
  'use strict';

  var DOM = {},
      ctx;

  function cacheDOM() {
    DOM.canvas = document.getElementById('game-board');
  }

  var Henry = new Monster(10, DOM.canvas.width/2, DOM.canvas.height/2);

  function render() {
    ctx = DOM.canvas.getContext("2d");
  }





  function init() {
    cacheDOM();
    addBackground();
    addGame();
    addMario();
  }


  return { init : init };


}());
