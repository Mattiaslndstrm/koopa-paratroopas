foreground = [
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
    ];

    var coordinates = [];
    var y = 0;
    for (var f = 0; f < foreground.length; f++) {
        var x = 0;
        for (var g = 0; g < foreground[f].length; g++) {
            var now = foreground[f][g];
            var co = {};
            if (now != ' ') {
                co.type = now;
                co.y = y;
                co.x = x;
                coordinates.push(co);
            }
            x += 16;
        }
        y += 16;
    }

    var coordinates2 = foreground.map(function(a) {
        var now = foreground.indexOf(a);
        var co = {};
        co.y = now*16;
        return a.split('').map(function(b) {
            if (b != ' ') {
                var now2 = foreground[now].indexOf(b);
                co.type = foreground[now][now2];
                co.x = now2 * 16;
                return co;
            }
        });
    });



    console.log(coordinates2.filter(x => x != undefined))