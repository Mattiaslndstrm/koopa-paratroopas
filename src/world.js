/**
 * src/background.js
 *
 * draws the background AND the foreground (stuff characters can walk on)
 *
*/

/*jshint esversion: 6 */

(function() {

  'use strict';

  var canvas = window.canvas;
  var ctx    = window.canvas.ctx;

  // new Image()
  var landscape = new Image();
  landscape.src = "assets/landscape_tileset.png";
//#6B8CFF
  // ================  CONSTRUCTORS =======================

  /**
   * Draws a game tile
   * @constructor
   * @param {string} type - letter that represents tile
   * @param {int}    x - horizontal position on canvas
   * @param {int}    y - vertical position on canvas
  */
  function Tile (type, x, y) {
    var image = landscape,
        column, row;
    switch (type) {
      case 'f':// floor tile
        column = 0;
        row    = 0;
        break;
      case 'B':// top brick
        column = 1;
        row    = 0;
        break;
      case 'b':// normal brick
        column = 2;
        row    = 0;
        break;
      case '#':// dead question block
        column = 3;
        row    = 0;
        break;
      case '?':// question block
        column = 24;
        row    = 0;
        break;
      case 'h':// hard block
        column = 0;
        row    = 1;
        break;
      case 'r':// rock block
        column = 1;
        row    = 1;
        break;
      case 'c':// castle block
        column = 2;
        row    = 1;
        break;
      case 't':// tree trunk
        column = 7;
        row    = 1;
        break;
      case '[':// vertical pipe spout, left
        column = 0;
        row    = 8;
        break;
      case ']':// vertical pipe spout, right
        column = 1;
        row    = 8;
        break;
      case '^':// horizontal pipe spout, top
        column = 2;
        row    = 8;
        break;
      case '=':// horizontal pipe, top
        column = 3;
        row    = 8;
        break;
      case 'J':// pipe junction, top
        column = 4;
        row    = 8;
        break;
      case '!':// vertical pipe, left
        column = 0;
        row    = 9;
        break;
      case '|':// vertical pipe, right
        column = 1;
        row    = 9;
        break;
      case 'v':// horizontal pipe spout, bottom
        column = 2;
        row    = 9;
        break;
      case '_':// horizontal pipe, bottom
        column = 3;
        row    = 9;
        break;
      case '7':// pipe junction, bottom
        column = 4;
        row    = 9;
        break;
      case '/':// hill slope, left
        column = 8;
        row    = 10;
        break;
      case '-':// hill top
        column = 9;
        row    = 10;
        break;
      case '`':// hill slope, right
        column = 10;
        row    = 10;
        break;
      case 'm':// hill, dots left
        column = 8;
        row    = 11;
        break;
      case 'M':// hill
        column = 9;
        row    = 11;
        break;
      case 'H':// hill, dots right
        column = 10;
        row    = 11;
        break;
      case '0':// small tree
        column = 13;
        row    = 8;
        break;
      case 'O':// large tree, top
        column = 14;
        row    = 8;
        break;
      case 'o':// large tree, bottom
        column = 14;
        row    = 9;
        break;
      case 'q':// bush left
        column = 11;
        row    = 11;
        break;
      case '%':// bush center
        column = 12;
        row    = 11;
        break;
      case 'p':// bush right
        column = 13;
        row    = 11;
        break;
      case '(':// cloud top, left
        column = 0;
        row    = 22;
        break;
      case '*':// cloud top, center
        column = 1;
        row    = 22;
        break;
      case ')':// cloud top, right
        column = 2;
        row    = 22;
        break;
      case '{':// cloud bottom, left
        column = 0;
        row    = 23;
        break;
      case 'C':// cloud bottom, center
        column = 1;
        row    = 23;
        break;
      case '}':// cloud bottom, right
        column = 2;
        row    = 23;
        break;
      case '.':// do nothing!  placeholder
        break;
      default:
        column = 29;
        row    = 0;
        break;
    }
    // render the tile
    image.addEventListener('load', function() {// "window.onload"
      ctx.drawImage( image, 16 * column, 16 * row, 16, 16, x, y, 16, 16);
    });
  }

  /**
   * draws the game world
   * @constructor
   * @param {int} level - index of levels array
  */
  function World (level) {
    var background_color;
    switch (levels[level].when) {
      case 'day':
        background_color = '#6B8CFF';
        break;
      case 'night':
        background_color = '#000000';
        break;
      default:
        background_color = '#ffffff';
        break;
    }
    return {
      when   : levels[level].when,
      length : levels[level].foreground[0].length,
      render : function() {
        // draw background color rectangle
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = background_color;
        ctx.fill();
        ctx.closePath();
        for (let vert = 0; vert < 16; vert++) {
          for (let horiz = 0; horiz < this.length; horiz++) {
            Tile(levels[level].background[vert].substring(horiz,horiz+1), horiz*16, vert*16);
          }
        }
        for (let vert = 0; vert < 16; vert++) {
          for (let horiz = 0; horiz < this.length; horiz++) {
            Tile(levels[level].foreground[vert].substring(horiz,horiz+1), horiz*16, vert*16);
          }
        }
      }
    };
  }

  // ============= Define the level geography =============
  var levels = [];

  levels.push({  // level 0, just so level one is index = 1
    background : [
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '        ..        ',
    '        ..        ',
    '        ..        ',
    '..................',
    '..................'
    ],
    foreground : [
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '                  ',
    '        []        ',
    '        !|        ',
    '        !|        ',
    'ffffffff!|ffffffff',
    'ffffffff!|ffffffff'
    ],
    when       : 'night'
  });

  levels.push({  // level 1
    background : [
    '                                                                                        ..',
    '                                                                                        ..',
    '                                                                                        ..',
    '                     (*)              (**)               (*)               (***)        ..',
    '                     {C}     (***)    {CC}    (*)        {C}      (***)    {CCC}        ..',
    '                             {CCC}            {C}                 {CCC}                 ..',
    '                        .                                              ........   ....  ..',
    '                                                                                        ..',
    '                                                                                        ..',
    '                                                                                        ..',
    '                  .   .....                     ..                  ...              .  ..',
    '  -                                     ..      ..                                      ..',
    ' /m`               -          ..        ..      ..                                      ..',
    '/mMm`        q%%%p/M`    q%p  .. q%%p   ..      ..q%%%p      q%p                 q%%[   ..',
    '...........................................................  .................   .........',
    '...........................................................  .................   .........'
    ],
    foreground : [
    '                                                                                        []',
    '                                                                                        !|',
    '                                                                                        !|',
    '                                                                                        !|',
    '                                                                                        !|',
    '                                                                                        !|',
    '                        ?                                              BBBBBBBB   BBB?  !|',
    '                                                                                        !|',
    '                                                                                        !|',
    '                                                                                        !|',
    '                  ?   B?B?B                     []                  B?B              B  !|',
    '                                        []      !|                                      !|',
    '                              []        !|      !|                                      !|',
    '                              !|        !|      !|                                      !|',
    'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff  fffffffffffffffff   fffffff!|',
    'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff  fffffffffffffffff   fffffff!|'
    ],
    when : "day"
  });

  // =================  DRAW WORLD ========================
  var level_0 = new World(0);
  var level_1 = new World(1);

  window.level_0 = level_0;
  // level_1.render();


}());
