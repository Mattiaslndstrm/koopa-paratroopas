(function() {
  'use strict';

  var keys = {
    right : 0,
    left  : 0,
    up    : 0,
    down  : 0
  }

  document.addEventListener('keydown', keyDownHandler, 0);
  document.addEventListener('keyup', keyUpHandler, 0);

  function keyDownHandler(e) {
      if (e.keyCode == 39) {
          keys.right = 1;
      }
      else if (e.keyCode == 37) {
          keys.left = 1;
      }
      else if (e.keyCode == 38) {
          keys.up = 1;
      }
      else if (e.keyCode == 40) {
          keys.down = 1;
      }
  }

  function keyUpHandler(e) {
      if (e.keyCode == 39) {
          keys.right = 0;
      }
      else if (e.keyCode == 37) {
          keys.left = 0;
      }
      else if (e.keyCode == 38) {
          keys.up = 0;
      }
      else if (e.keyCode == 40) {
          keys.down = 0;
      }
  }

  keys.isRunning = function() {
    if ( this.left || this.right ) {
      return true;
    } else {
      return false;
    }
  }

  keys.isJumping = function() {
    if ( this.up ) {
      return true;
    } else {
      return false;
    }
  }

  window.keys = keys;

}());
  
