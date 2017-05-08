/**
 * src/background.js
 *
 * draws the background AND the foreground (stuff characters can walk on)
 *
*/
(function() {

  'use strict';

  // canvas
  var DOM = {};

  DOM.$canvas = document.getElementById("game");
  DOM.$canvas.width  = 1280;
  DOM.$canvas.height = 480;
  var ctx     = DOM.$canvas.getContext("2d");

  // new Image()
  var landscape = new Image();
  landscape.src = "assets/landscape_tileset.png";

  // new World(1) should draw the entire level on the screen
  function World (level) {
    return {
      when : levels[level].when,
      length : levels[level].foreground[0].length,
      render : function() {
        for (let i = 0; i < 16; i++) {
          for (let j = 0; j < this.length; j++) {
            Tile(levels[level].background[i].substring(j,j+1), j*16, i*16);
          }
        }
        for (let i = 0; i < 16; i++) {
          for (let j = 0; j < this.length; j++) {
            Tile(levels[level].foreground[i].substring(j,j+1), j*16, i*16);
          }
        }
      }
    }
  }


  // Define the level geography
  var levels = [];

  levels.push({  // level 0, just so level one is index = 1
    background : [],
    foreground : [],
    when       : 'day'
  });
  
  levels.push({  // level 1
    background : [
    '                                                                          ',
    '                                                                          ',
    '                                                                          ',
    '                                                                          ',
    '    (***)                                                                 ',
    '    {CCC}                                                                 ',
    '           .                                                              ',
    '                                    ..                                    ',
    '                                    ..                                    ',
    '                                    ..                                    ',
    '     .   .....         O            ..              -                     ',
    '                       o   ..       ..             /m`                    ',
    '                 ..  0 t   ..    .....            /mMH`                   ',
    '   q%p    q%%%p  ..  t t   ..    .....           /mMMMH`                  ',
    '.........................................     ............................',
    '.........................................     ............................'
    ],
    foreground : [
    '                                                                          ',
    '                                                                          ',
    '                                                                          ',
    '                                                                          ',
    '                                                                          ',
    '                                                                          ',
    '           ?                                                              ',
    '                                    []                                    ',
    '                                    !|                                    ',
    '                                    !|                                    ',
    '     ?   B?B#B                      !|                                    ',
    '                           []       !|                                    ',
    '                 []        !|    ^==J|                                    ',
    '                 !|        !|    v__7|                                    ',
    'ffffffffffffffffffffffffffffffffffff!|fff chr ffffffffffffffffffffffffffff',
    'ffffffffffffffffffffffffffffffffffff!|fff     ffffffffffffffffffffffffffff'
    ],
    when : "day"
  });

  // new Tile( 'f', x, y ) -> puts the tile down!
  function Tile (type, x, y) {
    var that = {};
    that.context = ctx;
    that.image   = landscape;
    that.width   = 16;
    that.height  = 16;

    switch (type) {
      case 'f':// floor tile
        that.column = 0;
        that.row    = 0;
        break;
      case 'B':// top brick
        that.column = 1;
        that.row    = 0;
        break;
      case 'b':// normal brick
        that.column = 2;
        that.row    = 0;
        break;
      case '#':// dead question block
        that.column = 3;
        that.row    = 0;
        break;
      case '?':// question block
        that.column = 24;
        that.row    = 0;
        break;
      case 'h':// hard block
        that.column = 0;
        that.row    = 1;
        break;
      case 'r':// rock block
        that.column = 1;
        that.row    = 1;
        break;
      case 'c':// castle block
        that.column = 2;
        that.row    = 1;
        break;
      case 't':// tree trunk
        that.column = 7;
        that.row    = 1;
        break;
      case '[':// vertical pipe spout, left
        that.column = 0;
        that.row    = 8;
        break;
      case ']':// vertical pipe spout, right
        that.column = 1;
        that.row    = 8;
        break;
      case '^':// horizontal pipe spout, top
        that.column = 2;
        that.row    = 8;
        break;
      case '=':// horizontal pipe, top
        that.column = 3;
        that.row    = 8;
        break;
      case 'J':// pipe junction, top
        that.column = 4;
        that.row    = 8;
        break;
      case '!':// vertical pipe, left
        that.column = 0;
        that.row    = 9;
        break;
      case '|':// vertical pipe, right
        that.column = 1;
        that.row    = 9;
        break;
      case 'v':// horizontal pipe spout, bottom
        that.column = 2;
        that.row    = 9;
        break;
      case '_':// horizontal pipe, bottom
        that.column = 3;
        that.row    = 9;
        break;
      case '7':// pipe junction, bottom
        that.column = 4;
        that.row    = 9;
        break;
      case '/':// hill slope, left
        that.column = 8;
        that.row    = 10;
        break;
      case '-':// hill top
        that.column = 9;
        that.row    = 10;
        break;
      case '`':// hill slope, right
        that.column = 10;
        that.row    = 10;
        break;
      case 'm':// hill, dots left
        that.column = 8;
        that.row    = 11;
        break;
      case 'M':// hill
        that.column = 9;
        that.row    = 11;
        break;
      case 'H':// hill, dots right
        that.column = 10;
        that.row    = 11;
        break;
      case '0':// small tree
        that.column = 13;
        that.row    = 8;
        break;
      case 'O':// large tree, top
        that.column = 14;
        that.row    = 8;
        break;
      case 'o':// large tree, bottom
        that.column = 14;
        that.row    = 9;
        break;
      case 'q':// bush left
        that.column = 11;
        that.row    = 11;
        break;
      case '%':// bush center
        that.column = 12;
        that.row    = 11;
        break;
      case 'p':// bush right
        that.column = 13;
        that.row    = 11;
        break;
      case '(':// cloud top, left
        that.column = 0;
        that.row    = 22;
        break;
      case '*':// cloud top, center
        that.column = 1;
        that.row    = 22;
        break;
      case ')':// cloud top, right
        that.column = 2;
        that.row    = 22;
        break;
      case '{':// cloud bottom, left
        that.column = 0;
        that.row    = 23;
        break;
      case 'C':// cloud bottom, center
        that.column = 1;
        that.row    = 23;
        break;
      case '}':// cloud bottom, right
        that.column = 2;
        that.row    = 23;
        break;
      case '.':// do nothing!  placeholder
        break;
      default:
        that.column = 29;
        that.row    = 0;
        break;
    }

    // render the tile
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

  }

  var level_1 = new World(1);
  level_1.render();


}());
