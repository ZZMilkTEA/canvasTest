var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var myImageData = ctx.createImageData(canvas.width, canvas.height);
var offset = 0;

function draw() {
    for (var l = 0; l < myImageData.width; l++){
        for (var r = 0; r < myImageData.height; r++){
            myImageData.data[((r-1)*myImageData.width + (l-1))*4 - 1 + 1] = 0;
           //  myImageData.data[((r-1)*myImageData.width + (l-1))*4 - 1 + 2] = 255 * Math.sin((360/(r/300) + offset) * (Math.PI *2 /360)); //很神奇的透视效果
            myImageData.data[((r-1)*myImageData.width + (l-1))*4 - 1 + 2] = 255 * (Math.sin((360*(r/300) + offset) * (Math.PI *2 /360))+1)/2;
            myImageData.data[((r-1)*myImageData.width + (l-1))*4 - 1 + 3] = 255;
            myImageData.data[((r-1)*myImageData.width + (l-1))*4 - 1 + 4] = 255;
        }
    }
    offset += 2;
    if (offset > 360) offset = 0;
    ctx.putImageData(myImageData, 0, 0);

    requestAnimationFrame(draw);
}
draw();

function randomInt(from, to){
    return parseInt(Math.random() * (to - from + 1) + from);
}