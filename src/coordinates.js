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
    
    for (var f = 0; f < foreground.length; f++) {
        for (var g = 0; g < foreground[f].length; g++) {
            var now = foreground[f][g];
            var co = {};
            if (now != ' ') {
                co.type = now;
                co.y = f *16;
                co.x = g *16;
                coordinates.push(co);
            }
            
        }
        
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

coordinates3 = coordinates2.filter(Boolean)

    console.log(coordinates)
