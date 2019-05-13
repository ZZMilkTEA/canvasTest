var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var slipt = 30;
    var height = 50;
    for (var i = 0; i <= canvas.width ;i += slipt ) {
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 255 / canvas.width * i) + ',' +
            Math.floor(255 - 255 / canvas.width * i) + ',0)';
        ctx.fillRect(i, 0, slipt, height);
    }
    slipt = 1;
    height = 50;
    for (var i = 0; i <= canvas.width ;i += slipt ) {
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 255 / canvas.width * i) + ',' +
            Math.floor(255 - 255 / canvas.width * i) + ',0)';
        ctx.fillRect(i, 50, slipt, height);
    }
    slipt = 1;
    height = 50;
    for (var i = 0; i <= canvas.width ;i += slipt ) {
        ctx.fillStyle = `rgb(${255 - 255 / canvas.width * i},${randomInt(128, 255)},${randomInt(128, 255)})`;
        ctx.fillRect(i, 100, slipt, height);
    }
    slipt = 1;
    height = 1;
    for (var i = 0; i <= canvas.width ;i += slipt ) {
        for (var j = 0; j <= 50; j += height) {
            ctx.fillStyle = `rgb(${(255 - 255 / canvas.width * i)+randomInt(-30,30+j*2)} ,${randomInt(128, 255)},${randomInt(128, 255)})`;
            ctx.fillRect(i, 150+j, slipt, height);
        }
    }

    slipt = 1;
    height = 1;
    for (var i = 0; i <= canvas.width ;i += slipt ) {
        var randomValue = randomInt(0,255);
        for (var j = 0; j <= 50; j += height) {
            ctx.fillStyle = `rgb(${randomValue} ,${(255 - 255 / canvas.width * i)},${randomValue})`;
            ctx.fillRect(i, 200+j, slipt, height);
        }
    }

    slipt = 1;
    height = 5;
    var staut =true;
    var length = 0;
    for (var j = 0; j <= 100; j += height) {
        for (var i = 0; i <= canvas.width; i += slipt) {

            if (length === 0) {
                var randomValue = randomInt(10,20+randomInt(10,20));
                length = randomValue;
                if (staut) {
                    staut = false;
                } else {
                    staut = true;
                }
            }
            if (staut) {
                ctx.fillStyle = 'rgb('+ length * 5 + ',' + length * 5 + ',' + length * 5 + ')' ;
            } else {
                ctx.fillStyle = "#fff";
            }
            ctx.fillRect(i, 200 + j, slipt, height);
            length--;
        }
    }
    requestAnimationFrame(draw);
}
draw();


function randomInt(from, to){
    return parseInt(Math.random() * (to - from + 1) + from);
}