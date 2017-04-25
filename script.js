//The frames in the sprite sheet is 16x16px
//mario_wjlfy5.png

window.onload = function() {

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
// canvas.width = 100;
// canvas.height = 100;
// var marioImage = new Image();
// marioImage.src = 'images/mario_wjlfy5.png';
ctx.beginPath();
ctx.rect(0,0, 10,10);
ctx.fillStyle = '#FF0000';
ctx.fill();
ctx.closePath();

// function sprite (options) {
//     var that = {};

//     that.context = options.context;
//     that.width = options.width;
//     that.height = options.height;
//     that.image = options.image;

//     that.render = function () {
//         that.context.drawImage (
//             that.image,
//             0,
//             0,
//             that.width,
//             that.height,
//             0,
//             0,
//             that.width,
//             that.height);
//     };

//     return that;
// }


// var mario = sprite({
//     context: canvas.getContext('2d'),
//     width: 100,
//     height: 100,
//     image: marioImage
// });


// mario.render();


};